"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const likes_1 = require("../controllers/likes");
const authMiddleware_1 = require("../middleware/authMiddleware");
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
router.get("/user/likes/", authMiddleware_1.authMiddleware, likes_1.checkLike);
router.post("/like", authMiddleware_1.authMiddleware, likes_1.likePost);
router.post("/dislike", authMiddleware_1.authMiddleware, likes_1.dislikePost);
exports.default = router;
