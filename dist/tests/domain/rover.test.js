"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const rover_1 = require("../../src/domain/rover");
const position_1 = require("../../src/domain/position");
const grid_1 = require("../../src/domain/grid");
const direction_1 = require("../../src/domain/direction");
const tdd_helpers_1 = require("../tdd-helpers");
describe('Rover', () => {
    tdd_helpers_1.tdd.given('a rover at position (0,0,N) on a 10x10 grid', () => {
        let grid;
        let rover;
        beforeEach(() => {
            grid = new grid_1.Grid(10, 10);
            const initialPosition = new position_1.Position(0, 0, direction_1.Direction.NORTH);
            rover = new rover_1.Rover(initialPosition, grid);
        });
        tdd_helpers_1.tdd.when('executing command "R" (turn right)', () => {
            beforeEach(() => {
                rover.execute('R');
            });
            tdd_helpers_1.tdd.then('position should be (0,0,E)', () => {
                expect(rover.getPositionString()).toBe('0:0:E');
            });
        });
        tdd_helpers_1.tdd.when('executing command "L" (turn left)', () => {
            beforeEach(() => {
                rover.execute('L');
            });
            tdd_helpers_1.tdd.then('position should be (0,0,W)', () => {
                expect(rover.getPositionString()).toBe('0:0:W');
            });
        });
        tdd_helpers_1.tdd.when('executing command "M" (move forward)', () => {
            beforeEach(() => {
                rover.execute('M');
            });
            tdd_helpers_1.tdd.then('position should be (0,1,N)', () => {
                expect(rover.getPositionString()).toBe('0:1:N');
            });
        });
        tdd_helpers_1.tdd.when('executing commands "RMMLM"', () => {
            beforeEach(() => {
                rover.execute('RMMLM');
            });
            tdd_helpers_1.tdd.then('position should be (2,1,N)', () => {
                expect(rover.getPositionString()).toBe('2:1:N');
            });
        });
        tdd_helpers_1.tdd.when('moving off the north edge', () => {
            beforeEach(() => {
                // Move to the north edge and try to go beyond
                for (let i = 0; i < 10; i++) {
                    rover.execute('M');
                }
            });
            tdd_helpers_1.tdd.then('should wrap around to the bottom', () => {
                expect(rover.getPositionString()).toBe('0:0:N');
            });
        });
        tdd_helpers_1.tdd.when('moving off the east edge', () => {
            beforeEach(() => {
                rover.execute('R'); // Face east
                for (let i = 0; i < 10; i++) {
                    rover.execute('M');
                }
            });
            tdd_helpers_1.tdd.then('should wrap around to the west edge', () => {
                expect(rover.getPositionString()).toBe('0:0:E');
            });
        });
    });
    tdd_helpers_1.tdd.given('a rover on a grid with an obstacle at (1,1)', () => {
        let grid;
        let rover;
        beforeEach(() => {
            grid = new grid_1.Grid(10, 10, [[1, 1]]);
            const initialPosition = new position_1.Position(0, 0, direction_1.Direction.NORTH);
            rover = new rover_1.Rover(initialPosition, grid);
        });
        tdd_helpers_1.tdd.when('trying to move to the obstacle location', () => {
            beforeEach(() => {
                // Move to position (1,0) facing north, then try to move to (1,1)
                rover.execute('RM'); // Face east, move to (1,0)
                rover.execute('L'); // Face north
                rover.execute('M'); // Try to move to (1,1) which has an obstacle
            });
            tdd_helpers_1.tdd.then('should stop at last valid position and report obstacle', () => {
                expect(rover.getPositionString()).toBe('1:0:N:O');
            });
            tdd_helpers_1.tdd.then('should indicate an obstacle was encountered', () => {
                expect(rover.hasEncounteredObstacle()).toBe(true);
            });
        });
    });
});
