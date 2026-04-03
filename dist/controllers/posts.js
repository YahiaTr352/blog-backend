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
exports.getPostsByAuthor = exports.deletePost = exports.updatePost = exports.createPost = exports.getSinglePost = exports.getAllPosts = void 0;
const prisma_1 = __importDefault(require("../config/prisma"));
const getAllPosts = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { page = 1, pageSize = 9 } = req.query;
    try {
        const totalPosts = yield prisma_1.default.post.count();
        const totalPages = Math.ceil(totalPosts / Number(pageSize));
        const posts = yield prisma_1.default.post.findMany({
            orderBy: {
                updatedAt: "desc",
            },
            skip: (Number(page) - 1) * Number(pageSize),
            take: Number(pageSize),
            include: {
                comments: true,
                author: {
                    select: {
                        id: true,
                        username: true,
                        bio: true,
                        avatar: true,
                        fullName: true,
                    },
                },
            },
        });
        if (!posts) {
            res.status(404).json({ message: "Posts not found" });
        }
        res.status(200).json({
            page,
            totalPages,
            posts,
        });
    }
    catch (error) {
        next({ error, message: "Posts not found" });
    }
});
exports.getAllPosts = getAllPosts;
const getSinglePost = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const post = yield prisma_1.default.post.findUniqueOrThrow({
            where: {
                id: req.params.id,
            },
            include: {
                comments: true,
                author: {
                    select: {
                        id: true,
                        username: true,
                        bio: true,
                        avatar: true,
                        fullName: true,
                    },
                },
            },
        });
        res.status(200).json(post);
    }
    catch (error) {
        next({ error, message: "Post not found." });
    }
});
exports.getSinglePost = getSinglePost;
const createPost = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const newPost = yield prisma_1.default.post.create({
            data: Object.assign(Object.assign({}, req.body), { postImg: req.image, updatedAt: new Date() }),
        });
        res.status(201).json(newPost);
    }
    catch (error) {
        next({
            error,
            message: "Unable to create the post with given details.",
        });
    }
});
exports.createPost = createPost;
const updatePost = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const updatedPost = yield prisma_1.default.post.update({
            where: {
                id: req.params.id,
            },
            data: Object.assign(Object.assign({}, req.body), { postImg: req.image || undefined, updatedAt: new Date() }),
        });
        res.status(200).json(updatedPost);
    }
    catch (error) {
        next({
            error,
            message: "Unable to update the post with given details.",
        });
    }
});
exports.updatePost = updatePost;
const deletePost = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const deletingPost = yield prisma_1.default.post.delete({
            where: {
                id: req.params.id,
            },
        });
        res.status(200).json(deletingPost);
    }
    catch (error) {
        next({ error, message: "Unable to delete the post." });
    }
});
exports.deletePost = deletePost;
const getPostsByAuthor = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const postsByAuthor = yield prisma_1.default.post.findMany({
            where: {
                authorId: req.params.id,
            },
            include: {
                comments: true,
                author: {
                    select: {
                        id: true,
                        username: true,
                        bio: true,
                        avatar: true,
                        fullName: true,
                    },
                },
            },
        });
        if (!postsByAuthor) {
            res.status(404).json("Posts not found for the given author.");
        }
        res.status(200).json(postsByAuthor);
    }
    catch (error) {
        next({
            error,
            message: "Unable to retrieve the posts for the given author.",
        });
    }
});
exports.getPostsByAuthor = getPostsByAuthor;
