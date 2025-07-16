const express = require('express');
const router = express.Router();
const pool = require('../db');
const admin = require('firebase-admin');

// Middleware to verify Firebase token
router.use(async (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  const idToken = authHeader.split('Bearer ')[1];
  try {
    const decodedToken = await admin.auth().verifyIdToken(idToken);
    req.user = decodedToken;
    next();
  } catch (err) {
    return res.status(401).json({ error: 'Unauthorized' });
  }
});

// GET HUD config
router.get('/', async (req, res) => {
  const userId = req.user.uid;
  const result = await pool.query(
    'SELECT metrics, layout, thresholds FROM hud_preferences WHERE user_id = $1',
    [userId]
  );
  if (result.rows.length === 0) {
    return res.status(404).json({ error: 'No config found' });
  }
  res.json(result.rows[0]);
});

// POST or Update HUD config
router.post('/', async (req, res) => {
  const userId = req.user.uid;
  const { metrics, layout, thresholds } = req.body;

  if (!Array.isArray(metrics) || !layout) {
    return res.status(400).json({ error: 'Invalid input' });
  }

  const result = await pool.query(
    `INSERT INTO hud_preferences (user_id, metrics, layout, thresholds, updated_at)
     VALUES ($1, $2, $3, $4, NOW())
     ON CONFLICT (user_id)
     DO UPDATE SET metrics = $2, layout = $3, thresholds = $4, updated_at = NOW()
     RETURNING *`,
    [userId, metrics, layout, thresholds || {}]
  );

  res.json({ success: true, config: result.rows[0] });
});

module.exports = router;
