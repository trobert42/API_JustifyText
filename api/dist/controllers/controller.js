"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.postTokenHandler = exports.postTextJustifyHandler = exports.defaultHandler = void 0;
const defaultHandler = (req, res) => {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'application/json');
    res.write(JSON.stringify({
        message: `API not found at ${req.url}`,
    }));
    res.end();
};
exports.defaultHandler = defaultHandler;
const postTextJustifyHandler = (req, res) => {
    res.statusCode = 200;
    console.log('The request body :', req.body);
    const email = req.body['email'];
    if (!req.body || !email) {
        res.status(400);
        throw new Error('No email');
    }
    res.setHeader('Content-Type', 'application/json');
    res.write(JSON.stringify({
        message: `POST successful`,
    }));
    res.end();
};
exports.postTextJustifyHandler = postTextJustifyHandler;
const postTokenHandler = (req, res) => {
    res.statusCode = 200;
    console.log('The request body ' + req.body);
    res.setHeader('Content-Type', 'application/json');
    res.write(JSON.stringify({
        message: `POST successful`,
    }));
    res.end();
};
exports.postTokenHandler = postTokenHandler;
