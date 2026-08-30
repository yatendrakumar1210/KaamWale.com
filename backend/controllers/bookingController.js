import { store } from '../store/dataStore.js';

// Helper date/time functions
function getLocalDateString(d = new Date()) {
  const year = d.getFullYear();
  const month = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

function normalizeBookingDate(dateStr) {
  if (!dateStr) return '';
  const str = String(dateStr).trim();
  if (/^\d{4}-\d{2}-\d{2}$/.test(str)) {
    return str;
  }
  if (str === 'Aaj' || str.toLowerCase() === 'today') {
    return getLocalDateString(new Date());
  }
  if (str === 'Kal' || str.toLowerCase() === 'tomorrow') {
    const tom = new Date();
    tom.setDate(tom.getDate() + 1);
    return getLocalDateString(tom);
  }
  const parsed = new Date(str);
  if (!isNaN(parsed.getTime())) {
    return getLocalDateString(parsed);
  }
  return str;
}

function parseTimeToMinutes(timeStr) {
  if (!timeStr) return 9 * 60;
  const str = String(timeStr).trim().toUpperCase();
  const match = str.match(/^(\d{1,2}):(\d{2})\s*(AM|PM)?$/i);
  if (!match) return 9 * 60;
  let hours = parseInt(match[1], 10);
  const minutes = parseInt(match[2], 10);
  const ampm = match[3];

  if (ampm) {
    if (ampm === 'PM' && hours < 12) hours += 12;
    if (ampm === 'AM' && hours === 12) hours = 0;
  }
  return hours * 60 + minutes;
}

// @desc Create a new booking
// @route POST /api/bookings
// @access Private (Customer)
export const createBooking = (req, res) => {
  try {
    const {
      bookingType: rawBookingType = 'NORMAL',
      serviceId,
      serviceName,
      serviceType = 'daily',
      serviceRate: rawServiceRate,
      rateType = '',
      numberOfBags = 0,
      carryingDistance = '20m',
      weightPerBag = '40–50 kg',
      durationHours = 8,
      pricePerBag = 5,
      hourlyRate = 0,
      workerCount,
      date,
      duration,
      startTime = '09:00 AM',
      endTime = '06:00 PM',
      city,
      area,
      address,
      workLocation,
      description,
      requirements,
      customerName,
      customerPhone,
      customerEmail
    } = req.body;

    if (!serviceName || !workerCount || !date || (!address && !workLocation?.address)) {
      return res.status(400).json({ message: 'Missing required booking fields' });
    }

    const bookingType = String(rawBookingType).toUpperCase() === 'TATKAL' ? 'TATKAL' : 'NORMAL';
    const now = new Date();
    const todayStr = getLocalDateString(now);
    const reqDateNorm = normalizeBookingDate(date);

    // Rule 1 & 2: Booking Type & Date Validation
    if (bookingType === 'NORMAL') {
      if (reqDateNorm <= todayStr) {
        return res.status(400).json({
          message: 'Same-day booking is not available. Please select tomorrow or a later date.'
        });
      }
    } else if (bookingType === 'TATKAL') {
      if (reqDateNorm !== todayStr) {
        return res.status(400).json({
          message: "Tatkal booking is available only for today's booking."
        });
      }

      // Check 6-hour advance requirement
      const currentMinutes = now.getHours() * 60 + now.getMinutes();
      const startMinutes = parseTimeToMinutes(startTime);
      const diffMinutes = startMinutes - currentMinutes;

      if (diffMinutes < 360) {
        return res.status(400).json({
          message: 'Tatkal booking requires at least 6 hours advance notice.'
        });
      }
    }

    // Rule 5: Loading / Unloading Rate & Carrying Distance Validation
    const isLoadingUnloading = serviceType === 'loading_unloading' || serviceName.toLowerCase().includes('loading');
    let serviceRate = rawServiceRate !== undefined && rawServiceRate !== null ? Number(rawServiceRate) : null;
    const distanceOpt = carryingDistance && ['20m', '40m', '60m'].includes(carryingDistance) ? carryingDistance : '20m';

    if (isLoadingUnloading) {
      if (!serviceRate || ![4, 6, 8].includes(serviceRate)) {
        return res.status(400).json({
          message: 'Please select a valid rate: ₹4, ₹6, or ₹8.'
        });
      }
      if (carryingDistance && !['20m', '40m', '60m'].includes(carryingDistance)) {
        return res.status(400).json({
          message: 'Please select a valid carrying distance: 20m, 40m, or 60m.'
        });
      }
    }

    // Universal Price Calculation
    let labourAmount = 0;
    if (isLoadingUnloading) {
      const bagCount = Math.max(1, parseInt(numberOfBags) || 1);
      const distanceExtra = distanceOpt === '60m' ? 2 : distanceOpt === '40m' ? 1 : 0;
      const effectiveRate = serviceRate + distanceExtra;
      labourAmount = effectiveRate * bagCount;
    } else if (serviceType === 'hourly' || serviceName.toLowerCase().includes('hourly')) {
      const hourlyRates = { 2: 400, 4: 600, 6: 700 };
      const rate = Number(hourlyRate) || hourlyRates[durationHours] || 600;
      labourAmount = rate * Math.max(1, parseInt(workerCount) || 1);
    } else {
      const numDays = parseInt(duration) || 1;
      const baseDailyRate = serviceName.includes('Mistri') ? 950 : 650;
      labourAmount = Math.max(1, parseInt(workerCount) || 1) * numDays * baseDailyRate;
    }

    const transportationCharge = 50; // Mandatory ₹50 transportation charge
    const tatkalCharge = bookingType === 'TATKAL' ? 200 : 0;
    const totalAmount = labourAmount + transportationCharge + tatkalCharge;

    const booking = store.createBooking({
      customerId: req.user ? req.user.id : 'usr-guest',
      customerName: customerName || (req.user ? req.user.name : 'Guest User'),
      customerPhone: customerPhone || (req.user ? req.user.phone : ''),
      customerEmail: customerEmail || (req.user ? req.user.email : ''),
      bookingType,
      serviceId,
      serviceName,
      serviceType,
      serviceRate,
      rateType,
      numberOfBags: parseInt(numberOfBags) || 0,
      carryingDistance,
      weightPerBag,
      durationHours: parseInt(durationHours) || 8,
      pricePerBag: isLoadingUnloading ? serviceRate : (parseInt(pricePerBag) || 5),
      hourlyRate: parseInt(hourlyRate) || 0,
      workerCount: parseInt(workerCount) || 1,
      date,
      duration: duration || '1 Day',
      startTime,
      endTime,
      city: city || 'Bulandshahr',
      area: area || 'Central Area',
      address: address || workLocation?.address || 'Bulandshahr',
      workLocation: workLocation || {
        address: address || 'Bulandshahr',
        latitude: 28.4089,
        longitude: 77.8498
      },
      description: description || '',
      requirements: requirements || '',
      labourAmount,
      transportationCharge,
      tatkalCharge,
      totalAmount,
      estimatedCost: totalAmount,
      estimatedTotal: totalAmount
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
