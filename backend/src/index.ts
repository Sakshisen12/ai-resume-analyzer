import express from 'express';
import helmet from 'helmet';
import cors from 'cors';
import rateLimit from 'express-rate-limit';
import { config } from './config/env.js';
import { connectDB } from './config/db.js';
import { errorHandler } from './middleware/error.js';
import authRoutes from './routes/auth.routes.js';
import resumeRoutes from './routes/resume.routes.js';
import aiRoutes from './routes/ai.routes.js';
import jobRoutes from './routes/job.routes.js';
import historyRoutes from './routes/history.routes.js';
import './workers/analysis.worker.js';

const app = express();

// Security Middleware
app.use(helmet());
app.use(cors({
  origin: config.corsOrigin,
  credentials: true,
}));

// Rate Limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // Limit each IP to 100 requests per windowMs
  message: 'Too many requests from this IP, please try again after 15 minutes',
});
app.use('/api', limiter);

// Body Parser
app.use(express.json({ limit: '10kb' }));

// Database Connection
await connectDB();

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/resume', resumeRoutes);
app.use('/api/ai', aiRoutes);
app.use('/api/job', jobRoutes);
app.use('/api/history', historyRoutes);

app.get('/health', (req, res) => {
  res.status(200).json({ status: 'success', message: 'Server is healthy' });
});

// Centralized Error Handling
app.use(errorHandler);

const PORT = config.port;
app.listen(PORT, () => {
  console.log(`Server running in ${config.nodeEnv} mode on port ${PORT}`);
});
