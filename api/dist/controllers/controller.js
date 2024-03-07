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
const getTextJustify = (text) => {
    if (text.length <= 80)
        return text;
};
const postTextJustifyHandler = (req, res) => {
    console.log('The request body :', req.body);
    console.log('Content-Type :', req.headers['content-type']);
    // check headers authorizartion bearer !null
    // check token match
    // check body content-type && !null
    if (!req.is('text/plain')) {
        res.status(400);
        throw new Error('Content-Type wrong format');
    }
    if (!req.body) {
        res.status(400);
        throw new Error('Body is empty');
    }
    const justifiedText = getTextJustify(req.body);
    // check rate limit -> 402
    // add words/day in db
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/plain');
    res.send(justifiedText);
};
exports.postTextJustifyHandler = postTextJustifyHandler;
const postTokenHandler = (req, res) => {
    const email = req.body['email'];
    if (!req.body || !email) {
        res.status(400);
        throw new Error('No email');
    }
    res.statusCode = 200;
    console.log('The request body: ', req.body);
    res.setHeader('Content-Type', 'application/json');
    res.write(JSON.stringify({
        message: `POST successful`,
    }));
    res.end();
};
exports.postTokenHandler = postTokenHandler;
