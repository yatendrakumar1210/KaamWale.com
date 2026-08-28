import mongoose from 'mongoose';

const workerSchema = new mongoose.Schema({
  workerId: {
    type: String,
    unique: true
  },
  name: {
    type: String,
    required: [true, 'Worker name is required'],
    trim: true
  },
  phone: {
    type: String,
    required: [true, 'Phone is required'],
    trim: true
  },
  skills: {
    type: [String],
    default: []
  },
  experienceYears: {
    type: Number,
    default: 1
  },
  city: {
    type: String,
    default: 'Bulandshahr'
  },
  serviceAreas: {
    type: [String],
    default: []
  },
  availability: {
    type: String,
    enum: ['available', 'assigned', 'on_leave', 'inactive'],
    default: 'available'
  },
  verificationStatus: {
    type: String,
    enum: ['verified', 'pending', 'rejected'],
    default: 'verified'
  },
  dailyRate: {
    type: Number,
    default: 600
  },
  active: {
    type: Boolean,
    default: true
  }
}, {
  timestamps: true
});

// Auto-generate workerId like LCW-801
workerSchema.pre('save', async function (next) {
  if (this.workerId) return next();
  const count = await mongoose.model('Worker').countDocuments();
  this.workerId = `LCW-${801 + count}`;
  next();
});

const Worker = mongoose.model('Worker', workerSchema);
export default Worker;
