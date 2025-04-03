import { executeRoverCommands } from '../../src/application/roverService';
import { tdd } from '../tdd-helpers';

describe('RoverService', () => {
  tdd.given('the rover service', () => {
    tdd.when('executing commands "RMMLM"', () => {
      tdd.then('should return the final position string "2:1:N"', async () => {
        const result = await executeRoverCommands('RMMLM');
        expect(result).toBe('2:1:N');
      });
    });

    tdd.when('executing commands "MMMMMMMMMM" (10 moves north)', () => {
      tdd.then('should wrap around to "0:0:N"', async () => {
        const result = await executeRoverCommands('MMMMMMMMMM');
        expect(result).toBe('0:0:N');
      });
    });

    tdd.when('executing invalid commands', () => {
      tdd.then('should throw an error for unknown command "X"', async () => {
        await expect(executeRoverCommands('RMMXLM')).rejects.toThrow('Unknown command: X');
      });
    });
  });
});
