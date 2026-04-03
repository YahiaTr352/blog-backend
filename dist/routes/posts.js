"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const posts_1 = require("../controllers/posts");
const authMiddleware_1 = require("../middleware/authMiddleware");
const multerMiddleware_1 = require("../middleware/multerMiddleware");
const express_1 = __importDefault(require("express"));
const fileUploadMiddleware_1 = require("../middleware/fileUploadMiddleware");
const router = express_1.default.Router();
router.get("/", authMiddleware_1.authMiddleware, posts_1.getAllPosts);
router.get("/:id", authMiddleware_1.authMiddleware, posts_1.getSinglePost);
router.get("/author/:id", authMiddleware_1.authMiddleware, posts_1.getPostsByAuthor);
router.post("/", authMiddleware_1.authMiddleware, multerMiddleware_1.upload.single("postImg"), fileUploadMiddleware_1.fileUploadMiddleware, posts_1.createPost);
router.patch("/:id", authMiddleware_1.authMiddleware, multerMiddleware_1.upload.single("postImg"), fileUploadMiddleware_1.fileUploadMiddleware, posts_1.updatePost);
router.delete("/:id", authMiddleware_1.authMiddleware, posts_1.deletePost);
exports.default = router;
