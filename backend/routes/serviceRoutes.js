import express from 'express';
import { getServices, getServiceById, createService, updateService, deleteService } from '../controllers/serviceController.js';
import { protect, requireAdmin } from '../middleware/authMiddleware.js';

const router = express.Router();

router.get('/', getServices);
router.get('/:id', getServiceById);
router.post('/', protect, requireAdmin, createService);
router.put('/:id', protect, requireAdmin, updateService);
router.delete('/:id', protect, requireAdmin, deleteService);

export default router;
