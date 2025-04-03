import express from 'express';

describe('App', () => {
  it('should create an Express app', () => {
    const app = express();
    expect(app).toBeDefined();
    expect(app).toBeInstanceOf(Object);
    // Express apps have these methods
    expect(typeof app.get).toBe('function');
    expect(typeof app.post).toBe('function');
    expect(typeof app.use).toBe('function');
  });
});
