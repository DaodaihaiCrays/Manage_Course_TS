"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.connection = void 0;
// src/database.ts
require("reflect-metadata");
const dotenv_1 = __importDefault(require("dotenv"));
const course_1 = require("../models/course");
const lesson_1 = require("../models/lesson");
const typeorm_1 = require("typeorm");
const user_1 = require("../models/user");
// Load environment variables from .env file
dotenv_1.default.config();
exports.connection = new typeorm_1.DataSource({
    type: "mysql",
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT),
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    synchronize: false, // Sử dụng synchronize để tự động tạo bảng
    logging: true,
    entities: [course_1.Course, lesson_1.Lesson, user_1.User],
    migrations: [],
    subscribers: [],
});
exports.default = exports.connection;
