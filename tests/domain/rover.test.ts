import { Rover } from '../../src/domain/rover';
import { Position } from '../../src/domain/position';
import { Grid } from '../../src/domain/grid';
import { Direction } from '../../src/domain/direction';
import { tdd } from '../tdd-helpers';

describe('Rover', () => {
  tdd.given('a rover at position (0,0,N) on a 10x10 grid', () => {
    let grid: Grid;
    let rover: Rover;

    beforeEach(() => {
      grid = new Grid(10, 10);
      const initialPosition = new Position(0, 0, Direction.NORTH);
      rover = new Rover(initialPosition, grid);
    });

    tdd.when('executing command "R" (turn right)', () => {
      beforeEach(() => {
        rover.execute('R');
      });

      tdd.then('position should be (0,0,E)', () => {
        expect(rover.getPositionString()).toBe('0:0:E');
      });
    });

    tdd.when('executing command "L" (turn left)', () => {
      beforeEach(() => {
        rover.execute('L');
      });

      tdd.then('position should be (0,0,W)', () => {
        expect(rover.getPositionString()).toBe('0:0:W');
      });
    });

    tdd.when('executing command "M" (move forward)', () => {
      beforeEach(() => {
        rover.execute('M');
      });

      tdd.then('position should be (0,1,N)', () => {
        expect(rover.getPositionString()).toBe('0:1:N');
      });
    });

    tdd.when('executing commands "RMMLM"', () => {
      beforeEach(() => {
        rover.execute('RMMLM');
      });

      tdd.then('position should be (2,1,N)', () => {
        expect(rover.getPositionString()).toBe('2:1:N');
      });
    });

    tdd.when('moving off the north edge', () => {
      beforeEach(() => {
        // Move to the north edge and try to go beyond
        for (let i = 0; i < 10; i++) {
          rover.execute('M');
        }
      });

      tdd.then('should wrap around to the bottom', () => {
        expect(rover.getPositionString()).toBe('0:0:N');
      });
    });

    tdd.when('moving off the east edge', () => {
      beforeEach(() => {
        rover.execute('R'); // Face east
        for (let i = 0; i < 10; i++) {
          rover.execute('M');
        }
      });

      tdd.then('should wrap around to the west edge', () => {
        expect(rover.getPositionString()).toBe('0:0:E');
      });
    });
  });

  tdd.given('a rover on a grid with an obstacle at (1,1)', () => {
    let grid: Grid;
    let rover: Rover;

    beforeEach(() => {
      grid = new Grid(10, 10, [[1, 1]]);
      const initialPosition = new Position(0, 0, Direction.NORTH);
      rover = new Rover(initialPosition, grid);
    });

    tdd.when('trying to move to the obstacle location', () => {
      beforeEach(() => {
        // Move to position (1,0) facing north, then try to move to (1,1)
        rover.execute('RM'); // Face east, move to (1,0)
        rover.execute('L');  // Face north
        rover.execute('M');  // Try to move to (1,1) which has an obstacle
      });

      tdd.then('should stop at last valid position and report obstacle', () => {
        expect(rover.getPositionString()).toBe('1:0:N:O');
      });

      tdd.then('should indicate an obstacle was encountered', () => {
        expect(rover.hasEncounteredObstacle()).toBe(true);
      });
    });
  });
});
