import { Position } from '../../src/domain/position';
import { Direction } from '../../src/domain/direction';
import { tdd } from '../tdd-helpers';

describe('Position', () => {
  tdd.given('a position with x=2, y=3 and direction=NORTH', () => {
    let position: Position;

    beforeEach(() => {
      position = new Position(2, 3, Direction.NORTH);
    });

    tdd.then('toString should return "2:3:N"', () => {
      expect(position.toString()).toBe('2:3:N');
    });

    tdd.when('creating a copy', () => {
      let copy: Position;

      beforeEach(() => {
        copy = position.copy();
      });

      tdd.then('the copy should have the same values', () => {
        expect(copy.x).toBe(position.x);
        expect(copy.y).toBe(position.y);
        expect(copy.direction).toBe(position.direction);
      });

      tdd.then('the copy should be a different object', () => {
        expect(copy).not.toBe(position);
      });

      tdd.when('modifying the original', () => {
        beforeEach(() => {
          position.x = 5;
          position.y = 6;
          position.direction = Direction.EAST;
        });

        tdd.then('the copy should remain unchanged', () => {
          expect(copy.x).toBe(2);
          expect(copy.y).toBe(3);
          expect(copy.direction).toBe(Direction.NORTH);
        });
      });
    });
  });
});
