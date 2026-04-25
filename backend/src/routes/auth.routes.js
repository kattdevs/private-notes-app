const express = require('express');
const router = express.Router();
const supabase = require('../config/supabase');
const { authenticateToken } = require('../middleware/auth');

//Cookie configuration
const cookieOptions = {
    httpOnly: true,  //JavaScript cannot read this cookie (prevents XSS attacks)
    secure: process.env.NODE_ENV === 'production', //HTTPS only in production
    sameSite: 'strict', //Prevents CSRF attacks
    maxAge: 7 * 24 * 60 * 1000, // 7 days in millieseconds 
};

//POST /api/auth/signup
router.post('/signup', async (req, res) => {
    try{
        const { email, password } = req.body;

        //Validate input
        if (!email || !password) {
            return res.status(400).json({ error: 'Email and password are required'});
        }
        if (password.length < 6) {
            return res.status(400).json({ error: 'Password must be at least 6 characters.'});
        }

        //Create the user in Supabase Auth
        const { data, error } = await supabase.auth.admin.createUser ({
            email,
            password,
            email_conform: true, // Auto-confirm email for simplicity
        });

    
        if (error) throw error;

        res.status(201).json({ message:'Account created successfully! Please log in.'});
    } catch (error) {
        res.status(400).json({error: error.message});
    }
});

// POST /api/auth/login
router.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({ error: 'Email and password are required.'});
        }

        //Sign in with Supabase Auth
        const { data, error } = await supabase.auth.signInWithPassword({email, password});

        if (error) throw error;

        //Store the access token in a secure HTTP-only cookie
        res.cookie('access_token', data.session.access_token, cookieOptions);

        res.status(200).json({
            message: 'Logged in successfully!',
            user: {id: data.user.id, email: data.user.email}
        });
    } catch (error) {
        res.status(401).json({ error: 'Invalid email or password.'});
    }
});

//POST /api/auth/logout - PROTECTED
router.post ('/logout', authenticateToken, (req, res) => {
    //Clear the cookie by setting maxAge to 0 
    res.clearCookie('access_token', cookieOptions);
    res.status(200).json({message:'Logged out sucessfully.'});
});

//GET /api/auth/me - Get current user info
router.get('/me', authenticateToken, (req, res) => {
    res.status(200).json({user: req.user});
});
module.exports = router;