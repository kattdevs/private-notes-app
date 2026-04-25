const jwt = require ('jsonwebtoken');
require('dotenv').config();

const authenticateToken = (req, res, next) => {
    //1.Read the token from the HTTP-only cookie
    const token = req.cookies?.access_token;

    //2. If no token, deny access
    if (!token) {
        return res.status(401).json({error: 'Acess denied. Please log in'});
    }

    try {
        //3. Verify the token using your Supabase JWT secret
        const decoded = jwt.verify(token, process.env.SUPABASE_JWT_SECRET);

        //4. Attach the user data to the request object
        req.user = decoded 

        //5.Allow the request to continue to the route handler
        next();
    } catch (error) {
        return res.status(403).json({error: 'Invalid or expired token. Please log in again'});
    }
};

module.exports = { authenticateToken };