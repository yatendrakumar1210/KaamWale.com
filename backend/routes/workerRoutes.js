import express from 'express';
import { getWorkers, getWorkerById, createWorker, updateWorker, deleteWorker } from '../controllers/workerController.js';
import { protect, requireAdmin } from '../middleware/authMiddleware.js';

const router = express.Router();

// All workforce routes are protected for Admin/Ops only
router.use(protect, requireAdmin);

router.get('/', getWorkers);
router.get('/:id', getWorkerById);
router.post('/', createWorker);
router.put('/:id', updateWorker);
router.delete('/:id', deleteWorker);

export default router;
