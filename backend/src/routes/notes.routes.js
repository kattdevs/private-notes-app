const express = require('express');
const router = express.Router();
const supabase = require('../config/supabase');
const { authenticateToken } = require('../middleware/auth');

//All notes routes are protected - the user must be logged in 

//GET /api/notes - Get all notes for the logged-in user
router.get('/', authenticateToken, async (req, res) => {
    try {
        const userId = req.user.sub; //'sub' is the user ID in the JWT 

        const {data, error} = await supabase
        .from ('notes')
        .select('*')
        .eq('user_id', userId)
        .order('updated_at', {ascending:false});

        if (error) throw error;

        res.status(200).json({notes:data});
    } catch (error) {
        res.status(500).json({error: error.messsage});
    }
    });

    //POST /api/notes - Create a new note
    router.post('/', authenticateToken, async (req,res) => {
        try {
            const userId = req.user.sub;
            const {title, content} = req.body;

            if (!title) {
                return res.status(400).json({error: 'Title is required.'});
            }

            const {data, error} = await supabase
            .from('notes')
            .insert([{ user_id: userId, title, content: content || ''}])
            .select()
            .single();

            if (error) throw error;

            res.status(201).json({note: data});
        } catch (error) {
            res.status(500).json({error: error.message});
        }
    });

    // DELETE /api/notes/:id - Delete a note
    router.delete('/:id', authenticateToken, async (req,res) => {
        try{
            const userId = req.user.sub;
            const { id } = req.params;

            const { error } = await supabase
            .from('notes')
            .delete()
            .eq('id', id)
            .eq('user_id', userId);

            if (error) throw error;

            res.status(200).json({message: 'Note deleted successfully.'});
        } catch (error) {
            res.status(500).json({error: error.message});
        }
    });

    module.exports = router;