import { store } from '../store/dataStore.js';

export const getServices = (req, res) => {
  const { category } = req.query;
  const services = store.getServices(category);
  res.json(services);
};

export const getServiceById = (req, res) => {
  const service = store.getServiceById(req.params.id);
  if (!service) {
    return res.status(404).json({ message: 'Service not found' });
  }
  res.json(service);
};

export const createService = (req, res) => {
  const { name, category, description, icon, popular } = req.body;
  if (!name || !category) {
    return res.status(400).json({ message: 'Service name and category are required' });
  }
  const newService = store.createService({ name, category, description, icon: icon || 'HardHat', popular: !!popular });
  res.status(201).json(newService);
};

export const updateService = (req, res) => {
  const updated = store.updateService(req.params.id, req.body);
  if (!updated) {
    return res.status(404).json({ message: 'Service not found' });
  }
  res.json(updated);
};

export const deleteService = (req, res) => {
  store.deleteService(req.params.id);
  res.json({ message: 'Service removed' });
};
