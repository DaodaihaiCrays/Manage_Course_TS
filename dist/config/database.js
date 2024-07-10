"use strict";
// // src/database.ts
// import "reflect-metadata";
// import mysql from 'mysql2/promise';
// import dotenv from 'dotenv';
// import { Course } from '../models/course';
// import { Lesson } from '../models/lesson';
// import { DataSource } from 'typeorm';
// import { User } from "../models/user";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.connection = void 0;
// // Load environment variables from .env file
// dotenv.config();
// export const connection = new DataSource({
//     type: "mysql",
//     host: process.env.DB_HOST,
//     port: Number(process.env.DB_PORT),
//     username: process.env.DB_USER,
//     password: process.env.DB_PASSWORD,
//     database: process.env.DB_NAME,
//     synchronize: false, // Sử dụng synchronize để tự động tạo bảng
//     logging: true,
//     entities: [Course, Lesson, User],
//     migrations: [],
//     subscribers: [],
// });
// export default connection;
const promise_1 = __importDefault(require("mysql2/promise"));
const dotenv_1 = __importDefault(require("dotenv"));
// Load environment variables from .env file
dotenv_1.default.config();
// Tạo kết nối tới cơ sở dữ liệu
exports.connection = promise_1.default.createPool({
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT),
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});
exports.default = exports.connection;
