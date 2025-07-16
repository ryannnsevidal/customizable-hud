import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import admin from 'firebase-admin';
import path from 'path';
import hudRoutes from './routes/hud.js';
// FIX: Use require for JSON import
// eslint-disable-next-line @typescript-eslint/no-var-requires
const serviceAccount = require('../firebaseServiceAccountKey.json');
import { Pool } from 'pg';

dotenv.config();

// Use CommonJS globals for __filename and __dirname
// (No need for fileURLToPath or import.meta.url in CommonJS)
// __filename and __dirname are available by default in CommonJS

const app = express();

// PostgreSQL connection
const pool = new Pool({
  connectionString: process.env.DATABASE_URL
});
pool.connect()
  .then(() => console.log('🟢 Connected to PostgreSQL'))
  .catch((err: unknown) => console.error('🔴 PostgreSQL error:', err));


admin.initializeApp({
  credential: admin.credential.cert(serviceAccount as admin.ServiceAccount),
  projectId: process.env.FIREBASE_PROJECT_ID,
});

app.use(cors());
app.use(express.json());
app.use('/api/user/hud', hudRoutes);

app.use((_req, res) => {
  res.status(404).json({ error: 'Route not found' });
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`✅ HUD API running on port ${port}`);
});