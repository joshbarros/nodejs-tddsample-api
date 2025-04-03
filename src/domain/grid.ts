/**
 * Represents the grid on which the rover moves
 */
export class Grid {
  private obstacles: Set<string>;

  constructor(
    public width: number,
    public height: number,
    obstacles: Array<[number, number]> = []
  ) {
    this.obstacles = new Set(
      obstacles.map(([x, y]) => `${x}:${y}`)
    );
  }

  /**
   * Check if the given coordinates have an obstacle
   */
  hasObstacle(x: number, y: number): boolean {
    return this.obstacles.has(`${x}:${y}`);
  }

  /**
   * Add an obstacle at the given coordinates
   */
  addObstacle(x: number, y: number): void {
    this.obstacles.add(`${x}:${y}`);
  }

  /**
   * Normalize coordinates to wrap around the grid
   * e.g., if x=10 on a 10x10 grid (0-9), it wraps to x=0
   */
  normalizeCoordinates(x: number, y: number): [number, number] {
    // Ensure positive values first (for negative coordinates)
    const positiveX = ((x % this.width) + this.width) % this.width;
    const positiveY = ((y % this.height) + this.height) % this.height;

    return [positiveX, positiveY];
  }
}
