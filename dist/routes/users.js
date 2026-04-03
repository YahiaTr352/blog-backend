"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const users_1 = require("../controllers/users");
const authMiddleware_1 = require("../middleware/authMiddleware");
const express_1 = __importDefault(require("express"));
const multerMiddleware_1 = require("../middleware/multerMiddleware");
const fileUploadMiddleware_1 = require("../middleware/fileUploadMiddleware");
const router = express_1.default.Router();
router.get("/:id", authMiddleware_1.authMiddleware, users_1.getUserById);
router.patch("/:id", authMiddleware_1.authMiddleware, multerMiddleware_1.upload.single("avatar"), fileUploadMiddleware_1.fileUploadMiddleware, users_1.updateUser);
exports.default = router;
