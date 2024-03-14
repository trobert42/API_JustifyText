"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateUserWordsCount = exports.createUser = void 0;
const user_1 = __importDefault(require("../models/user"));
const success = (data) => ({ _tag: 'Success', data });
const failure = (error) => ({ _tag: 'Failure', error });
const createUser = async (email, token) => {
    try {
        const existingUser = await user_1.default.getUserFromEmail(email);
        if (existingUser) {
            return failure('User already exists');
        }
        const newUser = await user_1.default.createUser(email, token);
        console.log(`Success creatings User [${newUser.email}] at ${Date()}\n`);
        return success(newUser);
    }
    catch (error) {
        return failure('Internal server - An error occurred while creating user');
    }
};
exports.createUser = createUser;
const updateUserWordsCount = async (req, res, nbrWordsToAdd, nbrActualWords) => {
    try {
        await user_1.default.updateWordsCount(req.auth, nbrActualWords + nbrWordsToAdd);
        console.log(`Updating words (+${nbrWordsToAdd}) from user [${req.auth}]: ` +
            (nbrActualWords + nbrWordsToAdd) +
            `/80,000 at ${Date()}`);
    }
    catch (error) {
        res.status(500).json({
            error: 'Internal server - An error occurred while fetching wordsCount in db',
        });
    }
};
exports.updateUserWordsCount = updateUserWordsCount;
