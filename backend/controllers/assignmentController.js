import { store } from '../store/dataStore.js';

export const assignWorkersToBooking = (req, res) => {
  try {
    const { bookingId, workerIds, notes } = req.body;

    if (!bookingId || !workerIds || !Array.isArray(workerIds)) {
      return res.status(400).json({ message: 'Booking ID and an array of worker IDs are required' });
    }

    const assignedBy = req.user ? req.user.name : 'Admin Operations';

    const updatedBooking = store.assignWorkersToBooking(bookingId, workerIds, assignedBy, notes);

    if (!updatedBooking) {
      return res.status(404).json({ message: 'Booking not found' });
    }

    res.json({
      message: `Successfully assigned ${workerIds.length} worker(s) to booking ${bookingId}`,
      booking: store.sanitizeBooking(updatedBooking, false)
    });
  } catch (error) {
    res.status(500).json({ message: 'Error assigning workers', error: error.message });
  }
};
