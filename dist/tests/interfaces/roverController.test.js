"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
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
const roverService = __importStar(require("../../src/application/roverService"));
const tdd_helpers_1 = require("../tdd-helpers");
const roverController_1 = __importDefault(require("../../src/interfaces/roverController"));
// Mock the roverService module
jest.mock('../../src/application/roverService');
describe('Rover Controller', () => {
    let app;
    beforeEach(() => {
        jest.clearAllMocks();
        // Create a fresh Express app for each test
        app = (0, express_1.default)();
        app.use(express_1.default.json());
        app.use('/api/rover', roverController_1.default);
    });
    tdd_helpers_1.tdd.given('a rover controller', () => {
        tdd_helpers_1.tdd.when('receiving a valid command string', () => {
            beforeEach(() => {
                // Mock the service to return a predictable result
                jest.spyOn(roverService, 'executeRoverCommands').mockResolvedValue('2:1:N');
            });
            tdd_helpers_1.tdd.then('should return 200 with the position', () => __awaiter(void 0, void 0, void 0, function* () {
                const response = yield (0, supertest_1.default)(app)
                    .post('/api/rover/execute')
                    .send({ commands: 'RMMLM' })
                    .expect('Content-Type', /json/)
                    .expect(200);
                expect(response.body).toEqual({ position: '2:1:N' });
                expect(roverService.executeRoverCommands).toHaveBeenCalledWith('RMMLM');
            }));
        });
        tdd_helpers_1.tdd.when('receiving an empty request', () => {
            tdd_helpers_1.tdd.then('should return 400 Bad Request', () => __awaiter(void 0, void 0, void 0, function* () {
                const response = yield (0, supertest_1.default)(app)
                    .post('/api/rover/execute')
                    .send({})
                    .expect('Content-Type', /json/)
                    .expect(400);
                expect(response.body).toHaveProperty('error');
                expect(roverService.executeRoverCommands).not.toHaveBeenCalled();
            }));
        });
        tdd_helpers_1.tdd.when('the service throws an error', () => {
            beforeEach(() => {
                jest.spyOn(roverService, 'executeRoverCommands').mockRejectedValue(new Error('Invalid command'));
            });
            tdd_helpers_1.tdd.then('should return 500 with an error message', () => __awaiter(void 0, void 0, void 0, function* () {
                const response = yield (0, supertest_1.default)(app)
                    .post('/api/rover/execute')
                    .send({ commands: 'INVALID' })
                    .expect('Content-Type', /json/)
                    .expect(500);
                expect(response.body).toHaveProperty('error');
                expect(roverService.executeRoverCommands).toHaveBeenCalledWith('INVALID');
            }));
        });
    });
});
