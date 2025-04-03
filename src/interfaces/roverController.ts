import express, { Request, Response, RequestHandler } from 'express';
// Explicitly define the function signature to satisfy TypeScript
import { executeRoverCommands } from '../application/roverService';

const router = express.Router();

router.post('/execute', ((req: Request, res: Response) => {
  const { commands } = req.body;

  if (!commands || typeof commands !== 'string') {
    return res.status(400).json({
      error: 'Invalid request. Commands must be a string.'
    });
  }

  executeRoverCommands(commands)
    .then((result: string) => {
      return res.status(200).json({ position: result });
    })
    .catch((error: Error) => {
      console.error('Error executing rover commands:', error);
      return res.status(500).json({
        error: 'An error occurred while executing rover commands.'
      });
    });
}) as RequestHandler);

export default router;
