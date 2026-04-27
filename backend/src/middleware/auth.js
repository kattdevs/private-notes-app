const jwt = require('jsonwebtoken');
require('dotenv').config();

const authenticateToken = (req, res, next) => {
  const token = req.cookies?.access_token;

  if (!token) {
    return res.status(401).json({ error: 'Access denied. Please log in.' });
  }

  try {
    // Supabase JWT secret is base64 encoded — decode it first
    const secret = Buffer.from(process.env.SUPABASE_JWT_SECRET, 'base64');
    const decoded = jwt.verify(token, secret);
    req.user = decoded;
    next();
  } catch (error) {
    console.error('JWT Error:', error.message);
    return res.status(403).json({ error: 'Invalid or expired token. Please log in again.' });
  }
};

module.exports = { authenticateToken };