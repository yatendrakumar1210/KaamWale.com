import { store } from '../store/dataStore.js';

// @desc Create a new booking
// @route POST /api/bookings
// @access Private (Customer)
export const createBooking = (req, res) => {
  try {
    const {
      serviceId,
      serviceName,
      workerCount,
      date,
      duration,
      startTime,
      endTime,
      city,
      area,
      address,
      description,
      requirements,
      customerName,
      customerPhone,
      customerEmail
    } = req.body;

    if (!serviceName || !workerCount || !date || !city || !address) {
      return res.status(400).json({ message: 'Missing required booking fields' });
    }

    // Estimate cost based on worker count & duration
    const numDays = parseInt(duration) || 1;
    const baseDailyRate = serviceName.includes('Mistri') ? 950 : 650;
    const estimatedCost = (parseInt(workerCount) || 1) * numDays * baseDailyRate;

    const booking = store.createBooking({
      customerId: req.user ? req.user.id : 'usr-guest',
      customerName: customerName || (req.user ? req.user.name : 'Guest User'),
      customerPhone: customerPhone || (req.user ? req.user.phone : ''),
      customerEmail: customerEmail || (req.user ? req.user.email : ''),
      serviceId,
      serviceName,
      workerCount: parseInt(workerCount) || 1,
      date,
      duration: duration || '1 Day',
      startTime: startTime || '09:00 AM',
      endTime: endTime || '06:00 PM',
      city: city || 'Bulandshahr',
      area: area || 'Central Area',
      address,
      description: description || '',
      requirements: requirements || '',
      estimatedCost
    });

    res.status(201).json(booking);
  } catch (error) {
    res.status(500).json({ message: 'Error creating booking', error: error.message });
  }
};

// @desc Get customer's own bookings (Sanitized: NO internal worker info)
// @route GET /api/bookings
// @access Private (Customer)
export const getMyBookings = (req, res) => {
  try {
    const customerId = req.user.id;
    const bookings = store.getBookingsForCustomer(customerId);
    res.json(bookings);
  } catch (error) {
    res.status(500).json({ message: 'Error retrieving bookings', error: error.message });
  }
};

// @desc Get booking by ID (Sanitized if requested by customer, detailed if admin)
// @route GET /api/bookings/:id
// @access Public / Private
export const getBookingById = (req, res) => {
  try {
    const isAdmin = req.user && (req.user.role === 'admin' || req.user.role === 'operations');
    const booking = store.getBookingById(req.params.id, !isAdmin);

    if (!booking) {
      return res.status(404).json({ message: 'Booking not found' });
    }

    res.json(booking);
  } catch (error) {
    res.status(500).json({ message: 'Error retrieving booking', error: error.message });
  }
};

// @desc Get all bookings for Admin / Operations
// @route GET /api/bookings/admin/all
// @access Private (Admin)
export const getAllBookingsAdmin = (req, res) => {
  try {
    const bookings = store.getAllBookingsForAdmin();
    res.json(bookings);
  } catch (error) {
    res.status(500).json({ message: 'Error retrieving all bookings', error: error.message });
  }
};

// @desc Update booking status (Admin / Ops)
// @route PATCH /api/bookings/:id/status
// @access Private (Admin)
export const updateBookingStatus = (req, res) => {
  try {
    const { status, notes } = req.body;
    if (!status) {
      return res.status(400).json({ message: 'Status is required' });
    }

    const updatedBooking = store.updateBookingStatus(req.params.id, status, notes);

    if (!updatedBooking) {
      return res.status(404).json({ message: 'Booking not found' });
    }

    const isAdmin = req.user && (req.user.role === 'admin' || req.user.role === 'operations');
    res.json(store.sanitizeBooking(updatedBooking, !isAdmin));
  } catch (error) {
    res.status(500).json({ message: 'Error updating status', error: error.message });
  }
};

// @desc Cancel booking by Customer
// @route PATCH /api/bookings/:id/cancel
// @access Private (Customer)
export const cancelBooking = (req, res) => {
  try {
    const booking = store.getBookingById(req.params.id, false);

    if (!booking) {
      return res.status(404).json({ message: 'Booking not found' });
    }

    if (booking.customerId !== req.user.id && req.user.role === 'customer') {
      return res.status(403).json({ message: 'Unauthorized to cancel this booking' });
    }

    if (booking.status === 'completed') {
      return res.status(400).json({ message: 'Completed bookings cannot be cancelled' });
    }

    const updated = store.updateBookingStatus(req.params.id, 'cancelled', 'Cancelled by customer');
    res.json(store.sanitizeBooking(updated, true));
  } catch (error) {
    res.status(500).json({ message: 'Error cancelling booking', error: error.message });
  }
};
