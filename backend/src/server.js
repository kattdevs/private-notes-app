const express = require('express');
const cookieParser = require('cookie-parser');
const cors = require('cors');
require('dotenv').config();

const authRoutes = require('./routes/auth.routes');
const notesRoutes = require('./routes/notes.routes');

const app = express();
const PORT = process.env.PORT || 5000;

//----MIDDLEWARE ----
app.use(cors({
    origin: process.env.CLIENT_URL || 'http://localhost:3000',
    credentials: true, //Allow cookies to be sent cross-origin
}));

app.use(express.json()); //Parse JSON request bodies
app.use(cookieParser()); //Parse cookies 

// ----ROUTES----
app.use('/api/auth', authRoutes);
app.use('/api/notes', notesRoutes);

//----HEALTH CHECK----
app.get('/api/health', (req, res) => {
    res.status(200).json({status:'OK', message:'Server is running!'});
});

// ----404 HANDLER----
app.use((req, res) => {
    res.status(404).json({error:'Route not found.'});
});

//----ERROR HANDLER----
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({error: 'Something went wrong on the server.'});
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});