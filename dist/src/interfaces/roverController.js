"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const roverService_1 = require("../application/roverService");
const router = express_1.default.Router();
router.post('/execute', ((req, res) => {
    const { commands } = req.body;
    if (!commands || typeof commands !== 'string') {
        return res.status(400).json({
            error: 'Invalid request. Commands must be a string.'
        });
    }
    (0, roverService_1.executeRoverCommands)(commands)
        .then((result) => {
        return res.status(200).json({ position: result });
    })
        .catch((error) => {
        console.error('Error executing rover commands:', error);
        return res.status(500).json({
            error: 'An error occurred while executing rover commands.'
        });
    });
}));
exports.default = router;
