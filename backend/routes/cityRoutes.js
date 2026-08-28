import express from 'express';
import { getCities, createCity } from '../controllers/cityController.js';
import { protect, requireAdmin } from '../middleware/authMiddleware.js';

const router = express.Router();

router.get('/', getCities);
router.post('/', protect, requireAdmin, createCity);

export default router;
