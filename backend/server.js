import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import authRoutes from './routes/authRoutes.js';
import serviceRoutes from './routes/serviceRoutes.js';
import bookingRoutes from './routes/bookingRoutes.js';
import workerRoutes from './routes/workerRoutes.js';
import assignmentRoutes from './routes/assignmentRoutes.js';
import cityRoutes from './routes/cityRoutes.js';
import reviewRoutes from './routes/reviewRoutes.js';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

app.use(cors());
app.use(express.json());

// API Routes
app.use('/api/auth', authRoutes);
app.use('/api/services', serviceRoutes);
app.use('/api/bookings', bookingRoutes);
app.use('/api/workers', workerRoutes);
app.use('/api/assignments', assignmentRoutes);
app.use('/api/cities', cityRoutes);
app.use('/api/reviews', reviewRoutes);

app.get('/api/health', (req, res) => {
  res.json({
    status: 'online',
    app: 'LabourChowk.com Backend API',
    time: new Date().toISOString()
  });
});

// Serve static build from frontend/dist (only for non-Vercel environments)
if (!process.env.VERCEL) {
  const distPath = path.join(__dirname, '../frontend/dist');
  app.use(express.static(distPath));

  app.get('*', (req, res, next) => {
    if (req.path.startsWith('/api')) {
      return next();
    }
    res.sendFile(path.join(distPath, 'index.html'), (err) => {
      if (err) {
        next();
      }
    });
  });
}

// Error handling middleware
app.use((err, req, res, next) => {
  console.error('API Error:', err.stack);
  res.status(500).json({ message: 'Internal Server Error', error: err.message });
});

const PORT = process.env.PORT || 5000;

if (!process.env.VERCEL) {
  app.listen(PORT, () => {
    console.log(`🚀 LabourChowk Backend running on port ${PORT}`);
  });
}

export default app;

