"use strict";
/**
 * TDD Helper Functions
 *
 * These utility functions help with the TDD process by making tests more readable
 * and following best practices for test-driven development.
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.tdd = exports.todo = exports.expectResponse = void 0;
/**
 * Verify a response object meets expected criteria
 */
exports.expectResponse = {
    toHaveStatus: (res, status) => {
        expect(res.status).toBe(status);
    },
    toBeJson: (res) => {
        expect(res.headers['content-type']).toMatch(/json/);
    },
    toHaveProperty: (res, property) => {
        expect(res.body).toHaveProperty(property);
    }
};
/**
 * Create a pending test as a reminder to implement
 * (useful during the Red phase of TDD)
 */
const todo = (description) => {
    it(`TODO: ${description}`, () => {
        pending(`Implement test for: ${description}`);
    });
};
exports.todo = todo;
/**
 * Helper for TDD patterns
 */
exports.tdd = {
    /**
     * Creates a "then" block with a descriptive name
     */
    then: (description, fn) => {
        it(`Then ${description}`, fn);
    },
    /**
     * Creates a "given" block with a descriptive name
     */
    given: (description, fn) => {
        describe(`Given ${description}`, fn);
    },
    /**
     * Creates a "when" block with a descriptive name
     */
    when: (description, fn) => {
        describe(`When ${description}`, fn);
    }
};
