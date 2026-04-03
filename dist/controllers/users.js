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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateUser = exports.getUserById = void 0;
const prisma_1 = __importDefault(require("../config/prisma"));
const getUserById = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const foundUser = yield prisma_1.default.user.findUnique({
            where: {
                id: req.params.id,
            },
        });
        res.status(200).json(foundUser);
    }
    catch (error) {
        next({ error, message: "User not found." });
    }
});
exports.getUserById = getUserById;
const updateUser = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const updatedUser = yield prisma_1.default.user.update({
            where: {
                id: req.params.id,
            },
            data: Object.assign(Object.assign({}, req.body), { avatar: req.image || undefined }),
        });
        res.status(200).json(updatedUser);
    }
    catch (error) {
        next({
            error,
            message: "Unable to update the user with given details.",
        });
    }
});
exports.updateUser = updateUser;
