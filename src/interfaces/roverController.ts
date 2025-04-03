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

  // Handle null, undefined, or non-string values for commands
  if (commands === undefined || commands === null) {
    logger.warn('Commands parameter is missing or null', { body: req.body });
    return res.status(400).json({
      error: 'Invalid request. Commands parameter is required.'
    });
  }

  // Convert commands to string if it's a number or other type
  let commandsStr: string;
  if (typeof commands !== 'string') {
    logger.warn(`Commands parameter is not a string, received: ${typeof commands}`, { commands });
    commandsStr = String(commands);
    logger.info(`Converted commands to string: ${commandsStr}`);
  } else {
    commandsStr = commands;
  }

  if (commandsStr.trim() === '') {
    logger.warn('Empty commands string received');
    return res.status(400).json({
      error: 'Invalid request. Commands must not be empty.'
    });
  }

  logger.info(`Executing rover commands: ${commandsStr}`);

  executeRoverCommands(commandsStr)
    .then((result: string) => {
      logger.info(`Command execution successful: ${commandsStr} → ${result}`);
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
