import { Router } from 'express';

const router = Router();

router.get('/', (_req, res) => {
  res.json({ message: 'HUD settings fetched successfully' });
});

export default router;