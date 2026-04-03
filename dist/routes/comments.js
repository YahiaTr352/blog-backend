"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const comments_1 = require("../controllers/comments");
const authMiddleware_1 = require("../middleware/authMiddleware");
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
router.get("/post/:id", authMiddleware_1.authMiddleware, comments_1.getPostComments);
router.post("/", authMiddleware_1.authMiddleware, comments_1.createComment);
exports.default = router;
