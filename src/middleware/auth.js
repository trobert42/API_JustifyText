"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jwt = __importStar(require("jsonwebtoken"));
const user_1 = __importDefault(require("../models/user"));
const getEnvs_1 = require("../utils/getEnvs");
exports.default = (req, res, next) => {
    try {
        if (req.headers && req.headers.authorization) {
            if (req.headers.authorization.split(' ')[0] !== 'Bearer') {
                throw new Error();
            }
            const token = req.headers.authorization.split(' ')[1];
            if (!token) {
                throw new Error();
            }
            const payload = jwt.verify(token, (0, getEnvs_1.getEnvs)().jwtSecret);
            if (typeof payload === 'string') {
                return res.status(401).json({
                    error: `Unauthorized - Wrong token, no token or user not found`,
                });
            }
            const foundUser = user_1.default.getUserFromEmail(payload.email);
            if (!payload.email || !foundUser) {
                throw new Error();
            }
            req.auth = payload.email;
            next();
        }
        else {
            throw new Error();
        }
    }
    catch (error) {
        res.status(401).json({
            error: `Unauthorized - Wrong token, no token or user not found`,
        });
    }
};
