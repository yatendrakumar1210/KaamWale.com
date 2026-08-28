import express from 'express';
import { assignWorkersToBooking } from '../controllers/assignmentController.js';
import { protect, requireAdmin } from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/', protect, requireAdmin, assignWorkersToBooking);

export default router;
