"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
const express_1 = __importDefault(require("express"));
const justifyTextController_1 = require("../controllers/justifyTextController");
const auth_1 = __importDefault(require("../middleware/auth"));
exports.router = express_1.default.Router();
exports.router.post('/api/justify', auth_1.default, (req, res) => (0, justifyTextController_1.postTextJustifyHandler)(req, res));
exports.router.post('/api/token', justifyTextController_1.postTokenHandler);
exports.router.use((req, res) => res.status(404).json({
    error: `Not Found - API not found at ${req.url} for ${req.method}`,
}));
