"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const app_1 = require("../src/app");
describe('sum()', () => {
    it('Should return the sum of two numbers', () => {
        expect((0, app_1.sum)(1, 2)).toBe(3);
    });
});
