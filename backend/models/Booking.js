import mongoose from 'mongoose';

const counterSchema = new mongoose.Schema({
  _id: String,
  seq: { type: Number, default: 10000 }
});

const Counter = mongoose.model('Counter', counterSchema);

const bookingSchema = new mongoose.Schema({
  bookingId: {
    type: String,
    unique: true
  },
  customerId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  customerName: { type: String, required: true },
  customerPhone: { type: String, default: '' },
  customerEmail: { type: String, default: '' },
  serviceId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Service'
  },
  serviceName: { type: String, required: true },
  category: { type: String, default: 'majdoor' },
  workerCount: { type: Number, required: true, min: 1 },
  date: { type: String, required: true },
  duration: { type: String, default: '1 Day' },
  startTime: { type: String, default: '09:00 AM' },
  endTime: { type: String, default: '06:00 PM' },
  city: { type: String, default: 'Bulandshahr' },
  area: { type: String, default: '' },
  address: { type: String, required: true },
  description: { type: String, default: '' },
  requirements: { type: String, default: '' },
  status: {
    type: String,
    enum: ['finding_labour', 'confirmed', 'in_progress', 'completed', 'cancelled'],
    default: 'finding_labour'
  },
  estimatedCost: { type: Number, default: 0 },
  // INTERNAL ONLY — stripped for customer views
  assignedWorkers: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Worker'
  }],
  assignedBy: { type: String, default: '' },
  assignedAt: { type: Date },
  internalNotes: { type: String, default: '' }
}, {
  timestamps: true
});

// Auto-generate bookingId like LCB-10246
bookingSchema.pre('save', async function (next) {
  if (this.bookingId) return next();
  try {
    const counter = await Counter.findByIdAndUpdate(
      'bookingId',
      { $inc: { seq: 1 } },
      { new: true, upsert: true }
    );
    this.bookingId = `LCB-${counter.seq}`;
    next();
  } catch (err) {
    next(err);
  }
});

// Convenience: return a sanitized copy without internal fields
bookingSchema.methods.toCustomerView = function () {
  const obj = this.toObject();
  delete obj.assignedWorkers;
  delete obj.assignedBy;
  delete obj.assignedAt;
  delete obj.internalNotes;
  return obj;
};

const Booking = mongoose.model('Booking', bookingSchema);
export { Booking, Counter };
export default Booking;
