import { Direction } from './direction';

/**
 * Represents a position on the grid with x, y coordinates and a direction
 */
export class Position {
  constructor(
    public x: number,
    public y: number,
    public direction: Direction
  ) {}

  /**
   * Create a string representation of the position (e.g., "2:1:E")
   */
  toString(): string {
    return `${this.x}:${this.y}:${this.direction}`;
  }

  /**
   * Create a copy of this position
   */
  copy(): Position {
    return new Position(this.x, this.y, this.direction);
  }
}
