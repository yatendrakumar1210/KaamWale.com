import mongoose from 'mongoose';

const assignmentSchema = new mongoose.Schema({
  bookingId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Booking',
    required: true
  },
  workerIds: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Worker'
  }],
  assignedBy: {
    type: String,
    default: 'Admin'
  },
  status: {
    type: String,
    enum: ['assigned', 'released'],
    default: 'assigned'
  },
  internalNotes: {
    type: String,
    default: ''
  }
}, {
  timestamps: true
});

const Assignment = mongoose.model('Assignment', assignmentSchema);
export default Assignment;
