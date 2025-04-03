import request from 'supertest';
import express from 'express';
import * as roverService from '../../src/application/roverService';
import { tdd } from '../tdd-helpers';
import roverRoutes from '../../src/interfaces/roverController';

// Mock the roverService module
jest.mock('../../src/application/roverService');

describe('Rover Controller', () => {
  let app: express.Application;

  beforeEach(() => {
    jest.clearAllMocks();
    // Create a fresh Express app for each test
    app = express();
    app.use(express.json());
    app.use('/api/rover', roverRoutes);
  });

  tdd.given('a rover controller', () => {
    tdd.when('receiving a valid command string', () => {
      beforeEach(() => {
        // Mock the service to return a predictable result
        jest.spyOn(roverService, 'executeRoverCommands').mockResolvedValue('2:1:N');
      });

      tdd.then('should return 200 with the position', async () => {
        const response = await request(app)
          .post('/api/rover/execute')
          .send({ commands: 'RMMLM' })
          .expect('Content-Type', /json/)
          .expect(200);

        expect(response.body).toEqual({ position: '2:1:N' });
        expect(roverService.executeRoverCommands).toHaveBeenCalledWith('RMMLM');
      });
    });

    tdd.when('receiving an empty request', () => {
      tdd.then('should return 400 Bad Request', async () => {
        const response = await request(app)
          .post('/api/rover/execute')
          .send({})
          .expect('Content-Type', /json/)
          .expect(400);

        expect(response.body).toHaveProperty('error');
        expect(roverService.executeRoverCommands).not.toHaveBeenCalled();
      });
    });

    tdd.when('the service throws an error', () => {
      beforeEach(() => {
        jest.spyOn(roverService, 'executeRoverCommands').mockRejectedValue(
          new Error('Invalid command')
        );
      });

      tdd.then('should return 500 with an error message', async () => {
        const response = await request(app)
          .post('/api/rover/execute')
          .send({ commands: 'INVALID' })
          .expect('Content-Type', /json/)
          .expect(500);

        expect(response.body).toHaveProperty('error');
        expect(roverService.executeRoverCommands).toHaveBeenCalledWith('INVALID');
      });
    });
  });
});
