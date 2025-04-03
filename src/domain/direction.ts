/**
 * Represents the cardinal directions the rover can face
 */
export enum Direction {
  NORTH = 'N',
  EAST = 'E',
  SOUTH = 'S',
  WEST = 'W'
}

/**
 * Turn the direction right (clockwise)
 */
export function turnRight(direction: Direction): Direction {
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
export function turnLeft(direction: Direction): Direction {
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
