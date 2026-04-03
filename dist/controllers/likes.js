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
exports.checkLike = exports.dislikePost = exports.likePost = void 0;
const prisma_1 = __importDefault(require("../config/prisma"));
const likePost = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { postId, userId } = req.body;
        const updatedPost = yield prisma_1.default.post.update({
            where: {
                id: postId,
            },
            data: {
                likesNumber: { increment: 1 },
                likes: {
                    create: [
                        {
                            userId,
                        },
                    ],
                },
            },
        });
        res.status(201).json(updatedPost);
    }
    catch (error) {
        next({ error, message: "Unable to like this post" });
    }
});
exports.likePost = likePost;
const dislikePost = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { postId, userId } = req.body;
        const updatedPost = yield prisma_1.default.post.update({
            where: {
                id: postId,
            },
            data: {
                likesNumber: { decrement: 1 },
                likes: {
                    delete: [
                        {
                            likeId: {
                                postId,
                                userId,
                            },
                        },
                    ],
                },
            },
        });
        res.status(200).json(updatedPost);
    }
    catch (error) {
        next({ error, message: "Unable to dislike this post" });
    }
});
exports.dislikePost = dislikePost;
const checkLike = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { userId, postId } = req.query;
        const userLike = yield prisma_1.default.like.findUnique({
            where: {
                likeId: {
                    postId: postId,
                    userId: userId,
                },
            },
        });
        res.status(200).json({ isLiked: !!userLike });
    }
    catch (error) {
        next({
            error,
            message: "Unable to verify the like for the given post",
        });
    }
});
exports.checkLike = checkLike;
