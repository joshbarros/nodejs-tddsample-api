"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Position = void 0;
/**
 * Represents a position on the grid with x, y coordinates and a direction
 */
class Position {
    constructor(x, y, direction) {
        this.x = x;
        this.y = y;
        this.direction = direction;
    }
    /**
     * Create a string representation of the position (e.g., "2:1:E")
     */
    toString() {
        return `${this.x}:${this.y}:${this.direction}`;
    }
    /**
     * Create a copy of this position
     */
    copy() {
        return new Position(this.x, this.y, this.direction);
    }
}
exports.Position = Position;
