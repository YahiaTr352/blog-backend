"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateJwtToken = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const generateJwtToken = (userId, TOKEN_SECRET, expiryTime) => {
    return jsonwebtoken_1.default.sign({ id: userId }, TOKEN_SECRET, { expiresIn: expiryTime });
};
exports.generateJwtToken = generateJwtToken;
