import { Grid } from '../../src/domain/grid';
import { tdd } from '../tdd-helpers';

describe('Grid', () => {
  tdd.given('a 10x10 grid with obstacles at (3,5) and (7,8)', () => {
    const grid = new Grid(10, 10, [[3, 5], [7, 8]]);

    tdd.when('checking for obstacles', () => {
      tdd.then('(3,5) should have an obstacle', () => {
        expect(grid.hasObstacle(3, 5)).toBe(true);
      });

      tdd.then('(7,8) should have an obstacle', () => {
        expect(grid.hasObstacle(7, 8)).toBe(true);
      });

      tdd.then('(0,0) should not have an obstacle', () => {
        expect(grid.hasObstacle(0, 0)).toBe(false);
      });
    });

    tdd.when('adding a new obstacle at (1,2)', () => {
      grid.addObstacle(1, 2);

      tdd.then('(1,2) should have an obstacle', () => {
        expect(grid.hasObstacle(1, 2)).toBe(true);
      });
    });

    tdd.when('normalizing coordinates', () => {
      tdd.then('(5,5) should remain (5,5)', () => {
        const [x, y] = grid.normalizeCoordinates(5, 5);
        expect(x).toBe(5);
        expect(y).toBe(5);
      });

      tdd.then('(10,10) should wrap to (0,0)', () => {
        const [x, y] = grid.normalizeCoordinates(10, 10);
        expect(x).toBe(0);
        expect(y).toBe(0);
      });

      tdd.then('(15,18) should wrap to (5,8)', () => {
        const [x, y] = grid.normalizeCoordinates(15, 18);
        expect(x).toBe(5);
        expect(y).toBe(8);
      });

      tdd.then('(-1,-1) should wrap to (9,9)', () => {
        const [x, y] = grid.normalizeCoordinates(-1, -1);
        expect(x).toBe(9);
        expect(y).toBe(9);
      });

      tdd.then('(-10,-15) should wrap to (0,5)', () => {
        const [x, y] = grid.normalizeCoordinates(-10, -15);
        expect(x).toBe(0);
        expect(y).toBe(5);
      });
    });
  });
});
