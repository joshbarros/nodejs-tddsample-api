"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
describe('App', () => {
    it('should create an Express app', () => {
        const app = (0, express_1.default)();
        expect(app).toBeDefined();
        expect(app).toBeInstanceOf(Object);
        // Express apps have these methods
        expect(typeof app.get).toBe('function');
        expect(typeof app.post).toBe('function');
        expect(typeof app.use).toBe('function');
    });
});
