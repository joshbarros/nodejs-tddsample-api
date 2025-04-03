"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Rover = void 0;
const direction_1 = require("./direction");
const logger_1 = __importDefault(require("../utils/logger"));
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
        if (!commands) {
            logger_1.default.warn('Empty commands string received');
            return;
        }
        logger_1.default.debug(`Executing commands: ${commands}`);
        this.encounteredObstacle = false;
        for (const command of commands) {
            if (this.encounteredObstacle) {
                break;
            }
            try {
                this.executeCommand(command);
            }
            catch (error) {
                logger_1.default.error(`Failed to execute command '${command}'`, error);
                throw error;
            }
        }
        logger_1.default.debug(`Final position: ${this.getPositionString()}`);
    }
    /**
     * Execute a single command
     */
    executeCommand(command) {
        // Helper function to get direction name safely
        const getDirectionDisplay = (dir) => {
            switch (dir) {
                case direction_1.Direction.NORTH: return 'NORTH';
                case direction_1.Direction.EAST: return 'EAST';
                case direction_1.Direction.SOUTH: return 'SOUTH';
                case direction_1.Direction.WEST: return 'WEST';
                default: return `Unknown(${dir})`;
            }
        };
        switch (command) {
            case 'R':
                this.turnRight();
                logger_1.default.debug(`Turned right, now facing ${getDirectionDisplay(this.position.direction)}`);
                break;
            case 'L':
                this.turnLeft();
                logger_1.default.debug(`Turned left, now facing ${getDirectionDisplay(this.position.direction)}`);
                break;
            case 'M':
                this.moveForward();
                logger_1.default.debug(`Moved forward to (${this.position.x}, ${this.position.y})`);
                break;
            default: {
                // Using block scope to allow the error declaration
                const errorMsg = `Unknown command: ${command}`;
                const error = new Error(errorMsg);
                logger_1.default.error(`Invalid command received: '${command}'`, { validCommands: ['R', 'L', 'M'] });
                throw error;
            }
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
        const { x, y, direction } = this.position;
        let newX = x;
        let newY = y;
        // Calculate new position based on direction
        switch (direction) {
            case direction_1.Direction.NORTH:
                newY = (y + 1) % this.grid.height;
                break;
            case direction_1.Direction.EAST:
                newX = (x + 1) % this.grid.width;
                break;
            case direction_1.Direction.SOUTH:
                newY = (y - 1 + this.grid.height) % this.grid.height;
                break;
            case direction_1.Direction.WEST:
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
    getPosition() {
        return this.position;
    }
    /**
     * Get the position as a string (e.g., "2:1:E")
     */
    getPositionString() {
        const { x, y, direction } = this.position;
        if (this.encounteredObstacle) {
            return `${this.lastValidPosition.x}:${this.lastValidPosition.y}:${this.lastValidPosition.direction}:O`;
        }
        return `${x}:${y}:${direction}`;
    }
    /**
     * Check if the rover encountered an obstacle
     */
    hasEncounteredObstacle() {
        return this.encounteredObstacle;
    }
}
exports.Rover = Rover;
