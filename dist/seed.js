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
const prisma_1 = __importDefault(require("./config/prisma"));
const falso_1 = require("@ngneat/falso");
const deleteAll = () => __awaiter(void 0, void 0, void 0, function* () {
    yield prisma_1.default.like.deleteMany();
    yield prisma_1.default.comment.deleteMany();
    yield prisma_1.default.post.deleteMany();
    yield prisma_1.default.user.deleteMany();
});
const seed = () => __awaiter(void 0, void 0, void 0, function* () {
    const usersNumber = 50;
    const usersData = (0, falso_1.randUser)({ length: usersNumber }).map((user) => ({
        username: user.username,
        password: (0, falso_1.randPassword)(),
        bio: (0, falso_1.randTextRange)({ min: 100, max: 120 }),
        avatar: user.img,
        fullName: `${user.firstName} ${user.lastName}`,
    }));
    yield prisma_1.default.user.createMany({
        data: usersData,
    });
    const users = yield prisma_1.default.user.findMany();
    const postsNumber = 100;
    const likesNumber = Math.floor(Math.random() * usersNumber);
    const posts = (0, falso_1.randPost)({ length: postsNumber });
    for (let i = 0; i < postsNumber; i++) {
        const post = {
            title: posts[i].title.substring(0, 100),
            content: posts[i].body,
            preview: (0, falso_1.randTextRange)({ min: 100, max: 120 }),
            postImg: (0, falso_1.randImg)(),
            authorId: users[Math.floor(Math.random() * users.length)].id,
            likesNumber,
        };
        const likesData = [];
        for (let j = 0; j < likesNumber; j++) {
            likesData.push({
                userId: users[j].id,
            });
        }
        const commentsData = [];
        for (let j = 0; j < posts[i].comments.length; j++) {
            commentsData.push({
                content: posts[i].comments[j].text,
                authorId: users[j].id,
            });
        }
        yield prisma_1.default.post.create({
            data: Object.assign(Object.assign({}, post), { updatedAt: new Date(), likes: {
                    create: likesData,
                }, comments: {
                    create: commentsData,
                } }),
        });
    }
});
deleteAll().then(() => seed());
