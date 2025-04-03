"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const app_1 = __importDefault(require("../src/app"));
describe('App', () => {
    it('should create an Express app', () => {
        expect(app_1.default).toBeDefined();
        expect(app_1.default).toBeInstanceOf(Object);
        // Express apps have these methods
        expect(typeof app_1.default.get).toBe('function');
        expect(typeof app_1.default.post).toBe('function');
        expect(typeof app_1.default.use).toBe('function');
    });
});
