"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.postHandler = exports.defaultHandler = void 0;
const defaultHandler = (req, res) => {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'application/json');
    res.write(JSON.stringify({
        message: `API not found at ${req.url}`,
    }));
    res.end();
};
exports.defaultHandler = defaultHandler;
const postHandler = (req, res) => {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'application/json');
    res.write(JSON.stringify({
        message: `POST successful`,
    }));
    res.end();
};
exports.postHandler = postHandler;
