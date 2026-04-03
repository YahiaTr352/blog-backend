"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.logout = exports.login = exports.register = void 0;
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const generateJwtToken_1 = require("../utils/generateJwtToken");
const prisma_1 = __importDefault(require("../config/prisma"));
const register = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const registeringUser = req.body;
    if (!registeringUser.username ||
        !registeringUser.password ||
        !registeringUser.fullName) {
        return res
            .status(400)
            .json({
            message: "Username, password, and full name are required.",
        });
    }
    const existingUser = yield prisma_1.default.user.findUnique({
        where: {
            username: registeringUser.username,
        },
    });
    if (existingUser) {
        return res
            .status(409)
            .json({ message: "User with the given username already exists." });
    }
    try {
        const hashedPassword = yield bcryptjs_1.default.hash(registeringUser.password, 10);
        const newUser = yield prisma_1.default.user.create({
            data: Object.assign(Object.assign({}, registeringUser), { avatar: req.image, password: hashedPassword }),
        });
        const token = (0, generateJwtToken_1.generateJwtToken)(newUser.id, process.env.TOKEN_SECRET || "", "1d");
        res.cookie("jwt", token, {
            httpOnly: true,
            secure: true,
            sameSite: "none",
            maxAge: 24 * 60 * 60 * 1000,
        });
        res.status(201).json({ user: newUser });
    }
    catch (error) {
        next({
            error,
            message: "Unable to sign up the user with given credentials.",
        });
    }
});
exports.register = register;
const login = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { username, password: userPassword } = req.body;
        if (!username || !userPassword) {
            return res
                .status(400)
                .json({ message: "Username and password are required." });
        }
        const user = yield prisma_1.default.user.findUnique({
            where: {
                username,
            },
        });
        if (!user) {
            return res.status(404).json({ message: "Invalid username." });
        }
        const isPasswordCorrect = yield bcryptjs_1.default.compare(userPassword, user.password);
        if (!isPasswordCorrect) {
            return res.status(400).json({ message: "Invalid password." });
        }
        const token = (0, generateJwtToken_1.generateJwtToken)(user.id, process.env.TOKEN_SECRET || "", "1d");
        const { password } = user, userWithoutPassword = __rest(user, ["password"]);
        res.cookie("jwt", token, {
            httpOnly: true,
            secure: true,
            sameSite: "none",
            maxAge: 24 * 60 * 60 * 1000,
        });
        res.status(200).json({ user: userWithoutPassword });
    }
    catch (error) {
        next({
            error,
            message: "Unable to authenticate the user with given credentials.",
        });
    }
});
exports.login = login;
const logout = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const cookies = req.cookies;
        if (!(cookies === null || cookies === void 0 ? void 0 : cookies.jwt)) {
            return res.sendStatus(204);
        }
        res.clearCookie("jwt", {
            httpOnly: true,
            sameSite: "none",
            secure: true,
        });
        res.sendStatus(204);
    }
    catch (error) {
        next({ error, message: "Unable to logout" });
    }
});
exports.logout = logout;
