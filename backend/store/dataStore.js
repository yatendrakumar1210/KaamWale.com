import { initialCities, initialServices, initialUsers, initialWorkers, initialBookings, initialReviews } from '../data/seedData.js';

class DataStore {
  constructor() {
    this.cities = [...initialCities];
    this.services = [...initialServices];
    this.users = [...initialUsers];
    this.workers = [...initialWorkers];
    this.bookings = [...initialBookings];
    this.reviews = [...initialReviews];
  }

  // --- Users ---
  findUserByEmail(email) {
    return this.users.find(u => u.email.toLowerCase() === email.toLowerCase());
  }

  findUserByPhone(phone) {
    return this.users.find(u => u.phone === phone);
  }

  findUserById(id) {
    return this.users.find(u => u.id === id);
  }

  createUser(userData) {
    const newUser = {
      id: `usr-${Date.now()}`,
      ...userData,
      createdAt: new Date().toISOString()
    };
    this.users.push(newUser);
    return newUser;
  }

  // --- Services ---
  getServices(category) {
    if (category) {
      return this.services.filter(s => s.category.toLowerCase() === category.toLowerCase());
    }
    return this.services;
  }

  getServiceById(id) {
    return this.services.find(s => s.id === id);
  }

  createService(serviceData) {
    const newService = {
      id: `srv-${Date.now()}`,
      active: true,
      ...serviceData,
      createdAt: new Date().toISOString()
    };
    this.services.push(newService);
    return newService;
  }

  updateService(id, updateData) {
    const idx = this.services.findIndex(s => s.id === id);
    if (idx !== -1) {
      this.services[idx] = { ...this.services[idx], ...updateData };
      return this.services[idx];
    }
    return null;
  }

  deleteService(id) {
    this.services = this.services.filter(s => s.id !== id);
    return true;
  }

  // --- Bookings ---
  // IMPORTANT PRIVACY GUARANTEE:
  // sanitizeBooking removes assignedWorkers, internal notes, and worker details for customer views
  sanitizeBooking(booking, isCustomerView = true) {
    if (!booking) return null;
    const copy = { ...booking };
    if (isCustomerView) {
      delete copy.assignedWorkers;
      delete copy.internalNotes;
      delete copy.assignedBy;
    }
    return copy;
  }

  getBookingsForCustomer(customerId) {
    return this.bookings
      .filter(b => b.customerId === customerId)
      .map(b => this.sanitizeBooking(b, true));
  }

  getAllBookingsForAdmin() {
    return this.bookings.map(b => this.sanitizeBooking(b, false));
  }

  getBookingById(id, isCustomerView = true) {
    const b = this.bookings.find(b => b.id === id || b.bookingId === id);
    return this.sanitizeBooking(b, isCustomerView);
  }

  createBooking(bookingData) {
    const bookingCount = this.bookings.length + 10246;
    const bookingId = `LCB-${bookingCount}`;
    const bookingType = (bookingData.bookingType || 'NORMAL').toUpperCase();
    const transportationCharge = bookingData.transportationCharge !== undefined ? bookingData.transportationCharge : 50;
    const tatkalCharge = bookingData.tatkalCharge !== undefined ? bookingData.tatkalCharge : (bookingType === 'TATKAL' ? 200 : 0);
    const labourAmount = bookingData.labourAmount !== undefined ? bookingData.labourAmount : (bookingData.estimatedCost || 0);
    const totalAmount = bookingData.totalAmount !== undefined ? bookingData.totalAmount : (labourAmount + transportationCharge + tatkalCharge);

    const newBooking = {
      id: `bk-${Date.now()}`,
      bookingId,
      status: 'finding_labour',
      assignedWorkers: [],
      createdAt: new Date().toISOString(),
      serviceType: bookingData.serviceType || 'daily',
      numberOfBags: bookingData.numberOfBags || 0,
      carryingDistance: bookingData.carryingDistance || '20m',
      weightPerBag: bookingData.weightPerBag || '40–50 kg',
      durationHours: bookingData.durationHours || 8,
      pricePerBag: bookingData.pricePerBag || 5,
      hourlyRate: bookingData.hourlyRate || 0,
      bookingType,
      transportationCharge,
      tatkalCharge,
      labourAmount,
      serviceRate: bookingData.serviceRate,
      rateType: bookingData.rateType || '',
      totalAmount,
      estimatedCost: totalAmount,
      estimatedTotal: totalAmount,
      workLocation: bookingData.workLocation || {
        address: bookingData.address || 'Bulandshahr',
        latitude: 28.4089,
        longitude: 77.8498
      },
      ...bookingData,
      bookingType,
      transportationCharge,
      tatkalCharge,
      labourAmount,
      totalAmount,
      estimatedCost: totalAmount,
      estimatedTotal: totalAmount
    };
    this.bookings.unshift(newBooking);
    return this.sanitizeBooking(newBooking, true);
  }


  updateBookingStatus(id, status, notes = "") {
    const idx = this.bookings.findIndex(b => b.id === id || b.bookingId === id);
    if (idx !== -1) {
      this.bookings[idx].status = status;
      if (notes) {
        this.bookings[idx].internalNotes = notes;
      }
      this.bookings[idx].updatedAt = new Date().toISOString();
      return this.bookings[idx];
    }
    return null;
  }

  assignWorkersToBooking(bookingId, workerIds, assignedBy = "Admin", notes = "") {
    const idx = this.bookings.findIndex(b => b.id === bookingId || b.bookingId === bookingId);
    if (idx !== -1) {
      this.bookings[idx].assignedWorkers = workerIds;
      this.bookings[idx].status = 'confirmed';
      this.bookings[idx].assignedBy = assignedBy;
      this.bookings[idx].assignedAt = new Date().toISOString();
      if (notes) {
        this.bookings[idx].internalNotes = notes;
      }

      // Mark assigned workers status
      workerIds.forEach(wId => {
        const wIdx = this.workers.findIndex(w => w.id === wId || w.workerId === wId);
        if (wIdx !== -1) {
          this.workers[wIdx].availability = 'assigned';
        }
      });

      return this.bookings[idx];
    }
    return null;
  }

  // --- Workforce / Workers (ADMIN ONLY) ---
  getAllWorkers() {
    return this.workers;
  }

  getWorkerById(id) {
    return this.workers.find(w => w.id === id || w.workerId === id);
  }

  createWorker(workerData) {
    const count = this.workers.length + 809;
    const newWorker = {
      id: `wrk-${Date.now()}`,
      workerId: `LCW-${count}`,
      availability: 'available',
      verificationStatus: 'verified',
      createdAt: new Date().toISOString(),
      ...workerData
    };
    this.workers.push(newWorker);
    return newWorker;
  }

  updateWorker(id, updateData) {
    const idx = this.workers.findIndex(w => w.id === id || w.workerId === id);
    if (idx !== -1) {
      this.workers[idx] = { ...this.workers[idx], ...updateData };
      return this.workers[idx];
    }
    return null;
  }

  deleteWorker(id) {
    this.workers = this.workers.filter(w => w.id !== id && w.workerId !== id);
    return true;
  }

  // --- Cities ---
  getCities() {
    return this.cities;
  }

  createCity(cityData) {
    const newCity = {
      id: `city-${Date.now()}`,
      active: true,
      ...cityData
    };
    this.cities.push(newCity);
    return newCity;
  }

  // --- Reviews ---
  getReviews() {
    return this.reviews;
  }

  createReview(reviewData) {
    const newReview = {
      id: `rev-${Date.now()}`,
      createdAt: new Date().toISOString(),
      ...reviewData
    };
    this.reviews.unshift(newReview);
    return newReview;
  }
}

export const store = new DataStore();
