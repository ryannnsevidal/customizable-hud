import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import admin from 'firebase-admin';
import path from 'path';
import { fileURLToPath } from 'url';
import hudRoutes from './routes/hud.js';
import serviceAccount from '../firebaseServiceAccountKey.json' assert { type: 'json' };
import { Pool } from 'pg';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

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