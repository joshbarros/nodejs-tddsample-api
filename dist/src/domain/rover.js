"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Rover = void 0;
const direction_1 = require("./direction");
/**
 * Represents a rover that can move around on a grid
 */
class Rover {
    constructor(initialPosition, grid) {
        this.grid = grid;
        this.encounteredObstacle = false;
        this.position = initialPosition;
        this.lastValidPosition = initialPosition.copy();
    }
    /**
     * Execute a series of commands
     * @param commands String of commands (e.g., "RMMLM")
     */
    execute(commands) {
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
    executeCommand(command) {
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
    turnRight() {
        this.position.direction = (0, direction_1.turnRight)(this.position.direction);
        this.lastValidPosition = this.position.copy();
    }
    /**
     * Turn the rover left (counter-clockwise)
     */
    turnLeft() {
        this.position.direction = (0, direction_1.turnLeft)(this.position.direction);
        this.lastValidPosition = this.position.copy();
    }
    /**
     * Move the rover forward in the direction it's facing
     */
    moveForward() {
        let newX = this.position.x;
        let newY = this.position.y;
        // Calculate new position based on direction
        switch (this.position.direction) {
            case direction_1.Direction.NORTH:
                newY = (newY + 1);
                break;
            case direction_1.Direction.EAST:
                newX = (newX + 1);
                break;
            case direction_1.Direction.SOUTH:
                newY = (newY - 1);
                break;
            case direction_1.Direction.WEST:
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
    getPosition() {
        return this.position;
    }
    /**
     * Get the position as a string (e.g., "2:1:E")
     */
    getPositionString() {
        if (this.encounteredObstacle) {
            return `${this.lastValidPosition.toString()}:O`;
        }
        return this.position.toString();
    }
    /**
     * Check if the rover encountered an obstacle
     */
    hasEncounteredObstacle() {
        return this.encounteredObstacle;
    }
}
exports.Rover = Rover;
