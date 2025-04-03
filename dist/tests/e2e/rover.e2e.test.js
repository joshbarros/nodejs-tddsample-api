"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const supertest_1 = __importDefault(require("supertest"));
const express_1 = __importDefault(require("express"));
const roverController_1 = __importDefault(require("../../src/interfaces/roverController"));
describe('Mars Rover API', () => {
    let app;
    beforeEach(() => {
        // Create a fresh Express app for each test
        app = (0, express_1.default)();
        app.use(express_1.default.json());
        app.use('/api/rover', roverController_1.default);
    });
    it('should execute rover commands and return final position', () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield (0, supertest_1.default)(app)
            .post('/api/rover/execute')
            .send({ commands: 'RMMLM' });
        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty('position');
        expect(response.body.position).toBe('2:1:N');
    }));
});
