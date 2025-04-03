import express from 'express';

// Simple function for testing
export function sum(a: number, b: number) {
  return a + b;
}

// Create Express server
const app = express();
const port = process.env.PORT || 3000;

app.get('/', (req, res) => {
  res.json({ message: 'TDD Sample API is running!' });
});

// Start server if this file is run directly
if (require.main === module) {
  app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
  });
}

// Export for testing
export default app;
