import mongoose from 'mongoose';

const citySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
    trim: true
  },
  state: {
    type: String,
    required: true
  },
  serviceAreas: {
    type: [String],
    default: []
  },
  pinCodes: {
    type: [String],
    default: []
  },
  active: {
    type: Boolean,
    default: true
  }
}, {
  timestamps: true
});

const City = mongoose.model('City', citySchema);
export default City;
