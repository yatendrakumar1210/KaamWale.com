import { store } from '../store/dataStore.js';

export const getReviews = (req, res) => {
  res.json(store.getReviews());
};

export const createReview = (req, res) => {
  const { bookingId, rating, comment } = req.body;

  if (!bookingId || !rating) {
    return res.status(400).json({ message: 'Booking ID and rating are required' });
  }

  const review = store.createReview({
    bookingId,
    customerId: req.user ? req.user.id : 'usr-cust-1',
    customerName: req.user ? req.user.name : 'Customer',
    rating: parseInt(rating),
    comment: comment || ''
  });

  res.status(201).json(review);
};
