const { createClient } = require('@supabase/supabase-js');
require('dotenv').config();

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

const authenticateToken = async (req, res, next) => {
  const token = req.cookies?.access_token;

  if (!token) {
    return res.status(401).json({ error: 'Access denied. Please log in.' });
  }

  try {
    // Use Supabase to verify the token instead of manual JWT verification
    const { data: { user }, error } = await supabase.auth.getUser(token);

    if (error || !user) {
      return res.status(403).json({ error: 'Invalid or expired token. Please log in again.' });
    }

    // Attach user to request — use same format as before
    req.user = { sub: user.id, email: user.email };
    next();
  } catch (error) {
    console.error('Auth Error:', error.message);
    return res.status(403).json({ error: 'Invalid or expired token. Please log in again.' });
  }
};

module.exports = { authenticateToken };