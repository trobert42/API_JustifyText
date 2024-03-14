"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.postTokenHandler = exports.postTextJustifyHandler = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const userController_1 = require("./userController");
const justifyText_1 = require("../logic/justifyText");
const user_1 = __importDefault(require("../models/user"));
const getEnvs_1 = require("../utils/getEnvs");
const wordsLimitPerDay = 80000;
const postTextJustifyHandler = async (req, res) => {
    if (!req.is('text/plain')) {
        return res
            .status(400)
            .json({ error: `Bad request - Content-Type format not allowed` });
    }
    if (!req.body) {
        return res.status(400).json({ error: `Bad request - Empty body` });
    }
    const justifiedText = (0, justifyText_1.getJustifiedTextString)(req.body);
    const nbrWordsToAdd = (0, justifyText_1.countWords)(justifiedText);
    const nbrActualWords = (await user_1.default.getWordsCount(req.auth)) ?? 0;
    if (nbrWordsToAdd + nbrActualWords > wordsLimitPerDay) {
        return res.status(402).json({
            error: `Payment required - Exceeded rate limit for today, number left of words authorized: ` +
                (80000 - nbrActualWords),
        });
    }
    await (0, userController_1.updateUserWordsCount)(req, res, nbrWordsToAdd, nbrActualWords);
    console.log('Successfully justified text from post request!\n');
    res
        .status(200)
        .setHeader('Content-Type', 'text/plain')
        .send(justifiedText.toString());
};
exports.postTextJustifyHandler = postTextJustifyHandler;
const postTokenHandler = async (req, res) => {
    if (!req.body) {
        return res.status(400).json({ error: `Bad request - missing body` });
    }
    const email = req.body.email;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email || !emailRegex.test(email)) {
        return res.status(400).json({
            error: `Bad request, empty email, wrong email or wrong value for key1`,
        });
    }
    const token = jsonwebtoken_1.default.sign({ email: email }, (0, getEnvs_1.getEnvs)().jwtSecret);
    if (!token) {
        return res
            .status(500)
            .json({ error: `Internal server - Unable to retrieve token` });
    }
    const createdUserResult = await (0, userController_1.createUser)(req.body, token);
    if (createdUserResult._tag === 'Success') {
        return res.status(201).json({ token: token });
    }
    if (createdUserResult.error === 'User already exists') {
        return res.status(409).json({ error: `Conflict - User already exists` });
    }
    return res
        .status(500)
        .json({ error: `Internal server - Unable to create user` });
};
exports.postTokenHandler = postTokenHandler;
