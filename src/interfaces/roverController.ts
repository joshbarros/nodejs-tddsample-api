import express, { Request, Response, RequestHandler } from 'express';
// Explicitly define the function signature to satisfy TypeScript
import { executeRoverCommands } from '../application/roverService';
import logger from '../utils/logger';

const router = express.Router();

router.post('/execute', ((req: Request, res: Response) => {
  // Check if req.body is defined
  if (!req.body) {
    logger.warn('Request body is undefined');
    return res.status(400).json({
      error: 'Invalid request. Request body is missing.'
    });
  }

  const { commands } = req.body;

  if (!commands || typeof commands !== 'string') {
    logger.warn('Invalid request received', { commands });
    return res.status(400).json({
      error: 'Invalid request. Commands must be a string.'
    });
  }

  logger.info(`Executing rover commands: ${commands}`);

  executeRoverCommands(commands)
    .then((result: string) => {
      logger.info(`Command execution successful: ${commands} → ${result}`);
      return res.status(200).json({ position: result });
    })
    .catch((error: Error) => {
      logger.error('Error executing rover commands', error);
      return res.status(500).json({
        error: 'An error occurred while executing rover commands.'
      });
    });
}) as RequestHandler);

export default router;
