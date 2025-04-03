import { Direction, turnLeft, turnRight } from '../../src/domain/direction';
import { tdd } from '../tdd-helpers';

describe('Direction', () => {
  tdd.given('a direction', () => {
    tdd.when('turning right', () => {
      tdd.then('NORTH should turn to EAST', () => {
        expect(turnRight(Direction.NORTH)).toBe(Direction.EAST);
      });

      tdd.then('EAST should turn to SOUTH', () => {
        expect(turnRight(Direction.EAST)).toBe(Direction.SOUTH);
      });

      tdd.then('SOUTH should turn to WEST', () => {
        expect(turnRight(Direction.SOUTH)).toBe(Direction.WEST);
      });

      tdd.then('WEST should turn to NORTH', () => {
        expect(turnRight(Direction.WEST)).toBe(Direction.NORTH);
      });
    });

    tdd.when('turning left', () => {
      tdd.then('NORTH should turn to WEST', () => {
        expect(turnLeft(Direction.NORTH)).toBe(Direction.WEST);
      });

      tdd.then('WEST should turn to SOUTH', () => {
        expect(turnLeft(Direction.WEST)).toBe(Direction.SOUTH);
      });

      tdd.then('SOUTH should turn to EAST', () => {
        expect(turnLeft(Direction.SOUTH)).toBe(Direction.EAST);
      });

      tdd.then('EAST should turn to NORTH', () => {
        expect(turnLeft(Direction.EAST)).toBe(Direction.NORTH);
      });
    });
  });
});
