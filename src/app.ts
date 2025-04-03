import express from 'express';
import roverRoutes from './interfaces/roverController';

// Create Express server
const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(express.json());

// Routes
app.use('/api/rover', roverRoutes);

// Root endpoint
app.get('/', (req, res) => {
  res.json({ message: 'Mars Rover API is running!' });
});

// Start server if this file is run directly
if (require.main === module) {
  app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
  });
}

// Export for testing
export default app;
