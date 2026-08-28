import express from 'express';
import {
  createBooking,
  getMyBookings,
  getBookingById,
  getAllBookingsAdmin,
  updateBookingStatus,
  cancelBooking
} from '../controllers/bookingController.js';
import { protect, requireAdmin } from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/', createBooking);
router.get('/my-bookings', protect, getMyBookings);
router.get('/admin/all', protect, requireAdmin, getAllBookingsAdmin);
router.get('/:id', getBookingById);
router.patch('/:id/status', protect, requireAdmin, updateBookingStatus);
router.patch('/:id/cancel', protect, cancelBooking);

export default router;
