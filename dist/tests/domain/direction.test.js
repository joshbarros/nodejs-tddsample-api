"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const direction_1 = require("../../src/domain/direction");
const tdd_helpers_1 = require("../tdd-helpers");
describe('Direction', () => {
    tdd_helpers_1.tdd.given('a direction', () => {
        tdd_helpers_1.tdd.when('turning right', () => {
            tdd_helpers_1.tdd.then('NORTH should turn to EAST', () => {
                expect((0, direction_1.turnRight)(direction_1.Direction.NORTH)).toBe(direction_1.Direction.EAST);
            });
            tdd_helpers_1.tdd.then('EAST should turn to SOUTH', () => {
                expect((0, direction_1.turnRight)(direction_1.Direction.EAST)).toBe(direction_1.Direction.SOUTH);
            });
            tdd_helpers_1.tdd.then('SOUTH should turn to WEST', () => {
                expect((0, direction_1.turnRight)(direction_1.Direction.SOUTH)).toBe(direction_1.Direction.WEST);
            });
            tdd_helpers_1.tdd.then('WEST should turn to NORTH', () => {
                expect((0, direction_1.turnRight)(direction_1.Direction.WEST)).toBe(direction_1.Direction.NORTH);
            });
        });
        tdd_helpers_1.tdd.when('turning left', () => {
            tdd_helpers_1.tdd.then('NORTH should turn to WEST', () => {
                expect((0, direction_1.turnLeft)(direction_1.Direction.NORTH)).toBe(direction_1.Direction.WEST);
            });
            tdd_helpers_1.tdd.then('WEST should turn to SOUTH', () => {
                expect((0, direction_1.turnLeft)(direction_1.Direction.WEST)).toBe(direction_1.Direction.SOUTH);
            });
            tdd_helpers_1.tdd.then('SOUTH should turn to EAST', () => {
                expect((0, direction_1.turnLeft)(direction_1.Direction.SOUTH)).toBe(direction_1.Direction.EAST);
            });
            tdd_helpers_1.tdd.then('EAST should turn to NORTH', () => {
                expect((0, direction_1.turnLeft)(direction_1.Direction.EAST)).toBe(direction_1.Direction.NORTH);
            });
        });
    });
});
