"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const controller_1 = require("../controllers/controller");
const router = express_1.default.Router();
router.post('/api/justify', controller_1.postTextJustifyHandler);
router.post('/api/token', controller_1.postTokenHandler);
router.use(controller_1.defaultHandler);
module.exports = router;
