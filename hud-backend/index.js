const express = require('express');
const cors = require('cors');
require('dotenv').config();
const admin = require('firebase-admin');
const path = require('path');

const app = express();
const hudRoutes = require('./routes/hud');

// Load Firebase service account key
const serviceAccount = require(path.resolve(__dirname, 'firebaseServiceAccountKey.json'));

// Initialize Firebase Admin with credentials
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  projectId: process.env.FIREBASE_PROJECT_ID,
});

app.use(cors());
app.use(express.json());

// Protected API route using Firebase token verification
app.use('/api/user/hud', hudRoutes);

// Catch-all 404 route
app.use((req, res) => {
  res.status(404).json({ error: 'Route not found' });
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`✅ HUD API running on port ${port}`);
});
