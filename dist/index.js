"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config({ path: "../.env" });
const cors_1 = __importDefault(require("cors"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const users_1 = __importDefault(require("./routes/users"));
const posts_1 = __importDefault(require("./routes/posts"));
const auth_1 = __importDefault(require("./routes/auth"));
const likes_1 = __importDefault(require("./routes/likes"));
const comments_1 = __importDefault(require("./routes/comments"));
const path_1 = __importDefault(require("path"));
const errorMiddleware_1 = require("./middleware/errorMiddleware");
const cloudinary_1 = require("cloudinary");
const app = (0, express_1.default)();
const PORT = process.env.PORT || 3000;
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
app.use((0, cookie_parser_1.default)());
const corsOptions = {
    origin: [
        "http://localhost:5173",
        "http://localhost:4173",
        process.env.FRONTEND_SERVER_PROD || "",
    ],
    credentials: true,
};
app.use((0, cors_1.default)(corsOptions));
cloudinary_1.v2.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});
app.use("/uploads/", express_1.default.static(path_1.default.join(process.cwd(), "/uploads/")));
app.use("/posts", posts_1.default);
app.use("/posts", likes_1.default);
app.use("/users", users_1.default);
app.use("/auth", auth_1.default);
app.use("/comments", comments_1.default);
app.use(errorMiddleware_1.errorMiddleware);
app.listen({ address: "0.0.0.0", port: PORT }, () => {
    console.log(`Server running on port: ${PORT}`);
});
