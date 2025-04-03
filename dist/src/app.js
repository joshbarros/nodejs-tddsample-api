"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const roverController_1 = __importDefault(require("./interfaces/roverController"));
// Create Express server
const app = (0, express_1.default)();
const port = process.env.PORT || 3000;
// Middleware
app.use(express_1.default.json());
// Routes
app.use('/api/rover', roverController_1.default);
// Root endpoint
app.get('/', (req, res) => {
    res.json({ message: 'Mars Rover API is running!' });
});
// Start server if this file is run directly
if (require.main === module) {
    app.listen(port, () => {
        console.log(`Server is running on port ${port}`);
    });
}
// Export for testing
exports.default = app;
