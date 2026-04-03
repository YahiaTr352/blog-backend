"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const auth_1 = require("../controllers/auth");
const multerMiddleware_1 = require("../middleware/multerMiddleware");
const express_1 = __importDefault(require("express"));
const fileUploadMiddleware_1 = require("../middleware/fileUploadMiddleware");
const router = express_1.default.Router();
router.post("/register", multerMiddleware_1.upload.single("avatar"), fileUploadMiddleware_1.fileUploadMiddleware, auth_1.register);
router.post("/login", auth_1.login);
router.get("/logout", auth_1.logout);
exports.default = router;
