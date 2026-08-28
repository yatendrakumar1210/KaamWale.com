import { store } from '../store/dataStore.js';

// All endpoints in workerController require Admin / Ops authorization

export const getWorkers = (req, res) => {
  const workers = store.getAllWorkers();
  res.json(workers);
};

export const getWorkerById = (req, res) => {
  const worker = store.getWorkerById(req.params.id);
  if (!worker) {
    return res.status(404).json({ message: 'Worker not found' });
  }
  res.json(worker);
};

export const createWorker = (req, res) => {
  const { name, phone, skills, experienceYears, city, serviceAreas, dailyRate } = req.body;
  if (!name || !phone) {
    return res.status(400).json({ message: 'Worker name and phone are required' });
  }

  const worker = store.createWorker({
    name,
    phone,
    skills: skills || [],
    experienceYears: parseInt(experienceYears) || 1,
    city: city || 'Bulandshahr',
    serviceAreas: serviceAreas || ['Civil Lines'],
    dailyRate: parseInt(dailyRate) || 600
  });

  res.status(201).json(worker);
};

export const updateWorker = (req, res) => {
  const updated = store.updateWorker(req.params.id, req.body);
  if (!updated) {
    return res.status(404).json({ message: 'Worker not found' });
  }
  res.json(updated);
};

export const deleteWorker = (req, res) => {
  store.deleteWorker(req.params.id);
  res.json({ message: 'Worker removed' });
};
