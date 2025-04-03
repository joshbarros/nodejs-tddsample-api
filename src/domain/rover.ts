import { Position } from './position';
import { Grid } from './grid';
import { Direction, turnLeft, turnRight } from './direction';
import logger from '../utils/logger';

/**
 * Represents a rover that can move around on a grid
 */
export class Rover {
  private position: Position;
  private encounteredObstacle: boolean = false;
  private lastValidPosition: Position;

  constructor(
    initialPosition: Position,
    private grid: Grid
  ) {
    this.position = initialPosition;
    this.lastValidPosition = initialPosition.copy();
  }

  /**
   * Execute a series of commands
   * @param commands String of commands (e.g., "RMMLM")
   */
  execute(commands: string): void {
    if (!commands) {
      logger.warn('Empty commands string received');
      return;
    }

    logger.debug(`Executing commands: ${commands}`);

    this.encounteredObstacle = false;

    for (const command of commands) {
      if (this.encounteredObstacle) {
        break;
      }

      try {
        this.executeCommand(command);
      } catch (error) {
        logger.error(`Failed to execute command '${command}'`, error);
        throw error;
      }
    }

    logger.debug(`Final position: ${this.getPositionString()}`);
  }

  /**
   * Execute a single command
   */
  private executeCommand(command: string): void {
    // Helper function to get direction name safely
    const getDirectionDisplay = (dir: Direction): string => {
      switch (dir) {
        case Direction.NORTH: return 'NORTH';
        case Direction.EAST: return 'EAST';
        case Direction.SOUTH: return 'SOUTH';
        case Direction.WEST: return 'WEST';
        default: return `Unknown(${dir})`;
      }
    };

    // Check if command is valid
    const validCommands = ['R', 'L', 'M'];
    if (!validCommands.includes(command)) {
      logger.warn(`Invalid command received and ignored: '${command}'`, {
        validCommands,
        command
      });
      return; // Skip invalid commands instead of throwing error
    }

    // Process valid commands
    switch (command) {
      case 'R':
        this.turnRight();
        logger.debug(`Turned right, now facing ${getDirectionDisplay(this.position.direction)}`);
        break;
      case 'L':
        this.turnLeft();
        logger.debug(`Turned left, now facing ${getDirectionDisplay(this.position.direction)}`);
        break;
      case 'M':
        this.moveForward();
        logger.debug(`Moved forward to (${this.position.x}, ${this.position.y})`);
        break;
    }
  }

  /**
   * Turn the rover right (clockwise)
   */
  private turnRight(): void {
    this.position.direction = turnRight(this.position.direction);
    this.lastValidPosition = this.position.copy();
  }

  /**
   * Turn the rover left (counter-clockwise)
   */
  private turnLeft(): void {
    this.position.direction = turnLeft(this.position.direction);
    this.lastValidPosition = this.position.copy();
  }

  /**
   * Move the rover forward in the direction it's facing
   */
  private moveForward(): void {
    const { x, y, direction } = this.position;
    let newX = x;
    let newY = y;

    // Calculate new position based on direction
    switch (direction) {
      case Direction.NORTH:
        newY = (y + 1) % this.grid.height;
        break;
      case Direction.EAST:
        newX = (x + 1) % this.grid.width;
        break;
      case Direction.SOUTH:
        newY = (y - 1 + this.grid.height) % this.grid.height;
        break;
      case Direction.WEST:
        newX = (x - 1 + this.grid.width) % this.grid.width;
        break;
    }

    // Check for obstacles
    if (this.grid.hasObstacle(newX, newY)) {
      this.encounteredObstacle = true;
      return;
    }

    // Update position
    this.position.x = newX;
    this.position.y = newY;
    this.lastValidPosition = this.position.copy();
  }

  /**
   * Get the current position of the rover
   */
  getPosition(): Position {
    return this.position;
  }

  /**
   * Get the position as a string (e.g., "2:1:E")
   */
  getPositionString(): string {
    const { x, y, direction } = this.position;

    if (this.encounteredObstacle) {
      return `${this.lastValidPosition.x}:${this.lastValidPosition.y}:${this.lastValidPosition.direction}:O`;
    }

    return `${x}:${y}:${direction}`;
  }

  /**
   * Check if the rover encountered an obstacle
   */
  hasEncounteredObstacle(): boolean {
    return this.encounteredObstacle;
  }
}
