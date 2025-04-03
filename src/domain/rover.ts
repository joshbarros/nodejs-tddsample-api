import { Position } from './position';
import { Grid } from './grid';
import { Direction, turnLeft, turnRight } from './direction';

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
    this.encounteredObstacle = false;

    for (const command of commands) {
      if (this.encounteredObstacle) {
        break;
      }

      this.executeCommand(command);
    }
  }

  /**
   * Execute a single command
   */
  private executeCommand(command: string): void {
    switch (command) {
      case 'R':
        this.turnRight();
        break;
      case 'L':
        this.turnLeft();
        break;
      case 'M':
        this.moveForward();
        break;
      default:
        throw new Error(`Unknown command: ${command}`);
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
    let newX = this.position.x;
    let newY = this.position.y;

    // Calculate new position based on direction
    switch (this.position.direction) {
      case Direction.NORTH:
        newY = (newY + 1);
        break;
      case Direction.EAST:
        newX = (newX + 1);
        break;
      case Direction.SOUTH:
        newY = (newY - 1);
        break;
      case Direction.WEST:
        newX = (newX - 1);
        break;
    }

    // Normalize coordinates (wrap around the grid)
    [newX, newY] = this.grid.normalizeCoordinates(newX, newY);

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
    if (this.encounteredObstacle) {
      return `${this.lastValidPosition.toString()}:O`;
    }
    return this.position.toString();
  }

  /**
   * Check if the rover encountered an obstacle
   */
  hasEncounteredObstacle(): boolean {
    return this.encounteredObstacle;
  }
}
