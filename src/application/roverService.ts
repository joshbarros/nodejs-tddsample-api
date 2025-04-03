import { Rover } from '../domain/rover';
import { Position } from '../domain/position';
import { Grid } from '../domain/grid';
import { Direction } from '../domain/direction';

/**
 * Execute a series of commands on the rover and return the final position
 * @param commands String of commands (e.g., "RMMLM")
 * @returns Formatted position string (e.g., "2:1:E")
 */
export async function executeRoverCommands(commands: string): Promise<string> {
  // Create a 10x10 grid
  const grid = new Grid(10, 10);

  // Initialize rover at position 0,0,N
  const initialPosition = new Position(0, 0, Direction.NORTH);
  const rover = new Rover(initialPosition, grid);

  // Execute the commands
  rover.execute(commands);

  // Return the final position as a formatted string
  return rover.getPositionString();
}
