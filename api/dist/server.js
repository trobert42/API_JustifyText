"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const app = (0, express_1.default)();
const hostname = process.env.HOSTNAME || 'localhost';
const port = parseInt((_a = process.env.PORT) !== null && _a !== void 0 ? _a : '3000');
const routes = require('./routes/routes.js');
app.use((req, res, next) => {
    if (req.headers['Content-Type'] === 'application/json') {
        express_1.default.json()(req, res, next);
    }
    else if (req.headers['Content-Type'] === 'text/plain') {
        express_1.default.text()(req, res, next);
    }
    else {
        next();
    }
});
app.use('/', routes);
app.listen(port, () => {
    console.log(`Server listening at http://${hostname}:${port}/`);
});