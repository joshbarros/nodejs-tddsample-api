"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Direction = void 0;
exports.turnRight = turnRight;
exports.turnLeft = turnLeft;
/**
 * Represents the cardinal directions the rover can face
 */
var Direction;
(function (Direction) {
    Direction["NORTH"] = "N";
    Direction["EAST"] = "E";
    Direction["SOUTH"] = "S";
    Direction["WEST"] = "W";
})(Direction || (exports.Direction = Direction = {}));
/**
 * Turn the direction right (clockwise)
 */
function turnRight(direction) {
    switch (direction) {
        case Direction.NORTH:
            return Direction.EAST;
        case Direction.EAST:
            return Direction.SOUTH;
        case Direction.SOUTH:
            return Direction.WEST;
        case Direction.WEST:
            return Direction.NORTH;
        default:
            throw new Error(`Invalid direction: ${direction}`);
    }
}
/**
 * Turn the direction left (counter-clockwise)
 */
function turnLeft(direction) {
    switch (direction) {
        case Direction.NORTH:
            return Direction.WEST;
        case Direction.WEST:
            return Direction.SOUTH;
        case Direction.SOUTH:
            return Direction.EAST;
        case Direction.EAST:
            return Direction.NORTH;
        default:
            throw new Error(`Invalid direction: ${direction}`);
    }
}
