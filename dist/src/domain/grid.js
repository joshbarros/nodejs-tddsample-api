"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Grid = void 0;
/**
 * Represents the grid on which the rover moves
 */
class Grid {
    constructor(width, height, obstacles = []) {
        this.width = width;
        this.height = height;
        this.obstacles = new Set(obstacles.map(([x, y]) => `${x}:${y}`));
    }
    /**
     * Check if the given coordinates have an obstacle
     */
    hasObstacle(x, y) {
        return this.obstacles.has(`${x}:${y}`);
    }
    /**
     * Add an obstacle at the given coordinates
     */
    addObstacle(x, y) {
        this.obstacles.add(`${x}:${y}`);
    }
    /**
     * Normalize coordinates to wrap around the grid
     * e.g., if x=10 on a 10x10 grid (0-9), it wraps to x=0
     */
    normalizeCoordinates(x, y) {
        // Ensure positive values first (for negative coordinates)
        const positiveX = ((x % this.width) + this.width) % this.width;
        const positiveY = ((y % this.height) + this.height) % this.height;
        return [positiveX, positiveY];
    }
}
exports.Grid = Grid;
