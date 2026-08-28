import { store } from '../store/dataStore.js';

export const getCities = (req, res) => {
  res.json(store.getCities());
};

export const createCity = (req, res) => {
  const { name, state, serviceAreas, pinCodes } = req.body;
  if (!name || !state) {
    return res.status(400).json({ message: 'City name and state are required' });
  }

  const city = store.createCity({
    name,
    state,
    serviceAreas: serviceAreas || [],
    pinCodes: pinCodes || []
  });

  res.status(201).json(city);
};
