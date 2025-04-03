"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const position_1 = require("../../src/domain/position");
const direction_1 = require("../../src/domain/direction");
const tdd_helpers_1 = require("../tdd-helpers");
describe('Position', () => {
    tdd_helpers_1.tdd.given('a position with x=2, y=3 and direction=NORTH', () => {
        let position;
        beforeEach(() => {
            position = new position_1.Position(2, 3, direction_1.Direction.NORTH);
        });
        tdd_helpers_1.tdd.then('toString should return "2:3:N"', () => {
            expect(position.toString()).toBe('2:3:N');
        });
        tdd_helpers_1.tdd.when('creating a copy', () => {
            let copy;
            beforeEach(() => {
                copy = position.copy();
            });
            tdd_helpers_1.tdd.then('the copy should have the same values', () => {
                expect(copy.x).toBe(position.x);
                expect(copy.y).toBe(position.y);
                expect(copy.direction).toBe(position.direction);
            });
            tdd_helpers_1.tdd.then('the copy should be a different object', () => {
                expect(copy).not.toBe(position);
            });
            tdd_helpers_1.tdd.when('modifying the original', () => {
                beforeEach(() => {
                    position.x = 5;
                    position.y = 6;
                    position.direction = direction_1.Direction.EAST;
                });
                tdd_helpers_1.tdd.then('the copy should remain unchanged', () => {
                    expect(copy.x).toBe(2);
                    expect(copy.y).toBe(3);
                    expect(copy.direction).toBe(direction_1.Direction.NORTH);
                });
            });
        });
    });
});
