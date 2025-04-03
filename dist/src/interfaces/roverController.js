"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
// Explicitly define the function signature to satisfy TypeScript
const roverService_1 = require("../application/roverService");
const logger_1 = __importDefault(require("../utils/logger"));
const router = express_1.default.Router();
router.post('/execute', ((req, res) => {
    // Check if req.body is defined
    if (!req.body) {
        logger_1.default.warn('Request body is undefined');
        return res.status(400).json({
            error: 'Invalid request. Request body is missing.'
        });
    }
    const { commands } = req.body;
    // Handle null, undefined, or non-string values for commands
    if (commands === undefined || commands === null) {
        logger_1.default.warn('Commands parameter is missing or null', { body: req.body });
        return res.status(400).json({
            error: 'Invalid request. Commands parameter is required.'
        });
    }
    // Convert commands to string if it's a number or other type
    let commandsStr;
    if (typeof commands !== 'string') {
        logger_1.default.warn(`Commands parameter is not a string, received: ${typeof commands}`, { commands });
        commandsStr = String(commands);
        logger_1.default.info(`Converted commands to string: ${commandsStr}`);
    }
    else {
        commandsStr = commands;
    }
    if (commandsStr.trim() === '') {
        logger_1.default.warn('Empty commands string received');
        return res.status(400).json({
            error: 'Invalid request. Commands must not be empty.'
        });
    }
    logger_1.default.info(`Executing rover commands: ${commandsStr}`);
    (0, roverService_1.executeRoverCommands)(commandsStr)
        .then((result) => {
        logger_1.default.info(`Command execution successful: ${commandsStr} → ${result}`);
        return res.status(200).json({ position: result });
    })
        .catch((error) => {
        logger_1.default.error('Error executing rover commands', error);
        return res.status(500).json({
            error: 'An error occurred while executing rover commands.'
        });
    });
}));
exports.default = router;
