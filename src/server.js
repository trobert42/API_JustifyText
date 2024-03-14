"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cron_1 = __importDefault(require("./utils/cron"));
const routes_1 = require("./routes/routes");
const getEnvs_1 = require("./utils/getEnvs");
(0, getEnvs_1.getEnvs)();
(0, cron_1.default)();
const app = (0, express_1.default)();
const hostname = process.env.HOST || 'localhost';
const port = parseInt(process.env.PORT ?? '3000');
app.use((req, res, next) => {
    if (req.headers['content-type'] === 'application/json') {
        express_1.default.json()(req, res, next);
    }
    else if (req.headers['content-type'] === 'text/plain') {
        express_1.default.text()(req, res, next);
    }
    else {
        next();
    }
});
app.use((err, req, res, next) => {
    res.status(err.statusCode || 500).json({ error: err.message });
});
app.use('/', routes_1.router);
app.listen(port, () => {
    console.log(`Server listening at http://${hostname}:${port}/`);
});
exports.default = app;
