import request from 'supertest';
import express from 'express';
import roverRoutes from '../../src/interfaces/roverController';

describe('Mars Rover API', () => {
  let app: express.Application;

  beforeEach(() => {
    // Create a fresh Express app for each test
    app = express();
    app.use(express.json());
    app.use('/api/rover', roverRoutes);
  });

  it('should execute rover commands and return final position', async () => {
    const response = await request(app)
      .post('/api/rover/execute')
      .send({ commands: 'RMMLM' });

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('position');
    expect(response.body.position).toBe('2:1:N');
  });
});
