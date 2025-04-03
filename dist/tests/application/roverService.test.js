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
Object.defineProperty(exports, "__esModule", { value: true });
const roverService_1 = require("../../src/application/roverService");
const tdd_helpers_1 = require("../tdd-helpers");
describe('RoverService', () => {
    tdd_helpers_1.tdd.given('the rover service', () => {
        tdd_helpers_1.tdd.when('executing commands "RMMLM"', () => {
            tdd_helpers_1.tdd.then('should return the final position string "2:1:N"', () => __awaiter(void 0, void 0, void 0, function* () {
                const result = yield (0, roverService_1.executeRoverCommands)('RMMLM');
                expect(result).toBe('2:1:N');
            }));
        });
        tdd_helpers_1.tdd.when('executing commands "MMMMMMMMMM" (10 moves north)', () => {
            tdd_helpers_1.tdd.then('should wrap around to "0:0:N"', () => __awaiter(void 0, void 0, void 0, function* () {
                const result = yield (0, roverService_1.executeRoverCommands)('MMMMMMMMMM');
                expect(result).toBe('0:0:N');
            }));
        });
        tdd_helpers_1.tdd.when('executing invalid commands', () => {
            tdd_helpers_1.tdd.then('should throw an error for unknown command "X"', () => __awaiter(void 0, void 0, void 0, function* () {
                yield expect((0, roverService_1.executeRoverCommands)('RMMXLM')).rejects.toThrow('Unknown command: X');
            }));
        });
    });
});
