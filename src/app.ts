import express from 'express';
import roverRoutes from './interfaces/roverController';
import logger from './utils/logger';

// Create Express server
const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Add debug logging for requests in development mode
if (process.env.NODE_ENV === 'development') {
  app.use((req, res, next) => {
    logger.debug(`${req.method} ${req.url}`, {
      body: req.body,
      headers: req.headers
    });
    next();
  });
}

// Routes
app.use('/api/rover', roverRoutes);

// Root endpoint
app.get('/', (req, res) => {
  res.json({ message: 'Mars Rover API is running!' });
});

// Start server if this file is run directly
if (require.main === module) {
  app.listen(port, () => {
    logger.info(`🚀 Server is running on port ${port}`);
    logger.info(`🔗 API URL: http://localhost:${port}/api/rover/execute`);
    logger.info(`🛰️ Mars Rover API ready to accept commands!`);
  });
}

// Export for testing
export default app;
