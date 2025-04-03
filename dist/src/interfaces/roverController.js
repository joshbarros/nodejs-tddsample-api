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
    const { commands } = req.body;
    if (!commands || typeof commands !== 'string') {
        logger_1.default.warn('Invalid request received', { commands });
        return res.status(400).json({
            error: 'Invalid request. Commands must be a string.'
        });
    }
    logger_1.default.info(`Executing rover commands: ${commands}`);
    (0, roverService_1.executeRoverCommands)(commands)
        .then((result) => {
        logger_1.default.info(`Command execution successful: ${commands} → ${result}`);
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
