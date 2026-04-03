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
exports.getPostComments = exports.createComment = void 0;
const prisma_1 = __importDefault(require("../config/prisma"));
const createComment = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const newComment = yield prisma_1.default.comment.create({
            data: req.body,
        });
        res.status(201).json(newComment);
    }
    catch (error) {
        next({ error, message: "Unable to create new coment" });
    }
});
exports.createComment = createComment;
const getPostComments = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const postComments = yield prisma_1.default.comment.findMany({
            where: {
                postId: req.params.id,
            },
            include: {
                author: true,
            },
        });
        if (!postComments) {
            return res.status(404).json({ message: "Comments not found" });
        }
        res.status(200).json(postComments);
    }
    catch (error) {
        next({
            error,
            message: "Unable to retrieve the comments for the given post",
        });
    }
});
exports.getPostComments = getPostComments;
