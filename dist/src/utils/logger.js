"use strict";
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const winston_1 = __importDefault(require("winston"));
const chalk_1 = __importDefault(require("chalk"));
// Define custom log format with colors
const customFormat = winston_1.default.format.printf((_a) => {
    var _b;
    var { level, message, timestamp } = _a, metadata = __rest(_a, ["level", "message", "timestamp"]);
    let colorizedLevel;
    // Colorize log levels
    switch (level) {
        case 'error':
            colorizedLevel = chalk_1.default.red.bold('ERROR');
            break;
        case 'warn':
            colorizedLevel = chalk_1.default.yellow.bold('WARN');
            break;
        case 'info':
            colorizedLevel = chalk_1.default.green.bold('INFO');
            break;
        case 'debug':
            colorizedLevel = chalk_1.default.blue.bold('DEBUG');
            break;
        default:
            colorizedLevel = chalk_1.default.gray(level.toUpperCase());
    }
    // Format timestamp
    const timestampStr = timestamp ? chalk_1.default.gray(timestamp) : '';
    // Format metadata if exists
    const metadataStr = Object.keys(metadata).length
        ? `\n${chalk_1.default.gray('METADATA')}: ${chalk_1.default.cyan(JSON.stringify(metadata, null, 2))}`
        : '';
    // Format message based on type
    let formattedMessage;
    if (typeof message === 'object' && message instanceof Error) {
        formattedMessage = `${chalk_1.default.red(message.message)}\n${chalk_1.default.gray('STACK')}: ${(_b = message.stack) === null || _b === void 0 ? void 0 : _b.split('\n').slice(1).join('\n')}`;
    }
    else if (typeof message === 'object') {
        formattedMessage = chalk_1.default.cyan(JSON.stringify(message, null, 2));
    }
    else {
        formattedMessage = String(message);
    }
    return `${timestampStr} [${colorizedLevel}] ${formattedMessage}${metadataStr}`;
});
// Create logger
const logger = winston_1.default.createLogger({
    level: process.env.LOG_LEVEL || 'info',
    format: winston_1.default.format.combine(winston_1.default.format.timestamp({
        format: 'YYYY-MM-DD HH:mm:ss'
    }), customFormat),
    transports: [
        new winston_1.default.transports.Console()
    ]
});
exports.default = logger;
