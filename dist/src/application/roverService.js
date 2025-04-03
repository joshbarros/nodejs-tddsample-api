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
exports.executeRoverCommands = executeRoverCommands;
const rover_1 = require("../domain/rover");
const position_1 = require("../domain/position");
const grid_1 = require("../domain/grid");
const direction_1 = require("../domain/direction");
/**
 * Execute a series of commands on the rover and return the final position
 * @param commands String of commands (e.g., "RMMLM")
 * @returns Formatted position string (e.g., "2:1:E")
 */
function executeRoverCommands(commands) {
    return __awaiter(this, void 0, void 0, function* () {
        // Create a 10x10 grid
        const grid = new grid_1.Grid(10, 10);
        // Initialize rover at position 0,0,N
        const initialPosition = new position_1.Position(0, 0, direction_1.Direction.NORTH);
        const rover = new rover_1.Rover(initialPosition, grid);
        // Execute the commands
        rover.execute(commands);
        // Return the final position as a formatted string
        return rover.getPositionString();
    });
}
