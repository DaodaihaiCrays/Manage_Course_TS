// // src/database.ts
// import "reflect-metadata";
// import mysql from 'mysql2/promise';
// import dotenv from 'dotenv';
// import { Course } from '../models/course';
// import { Lesson } from '../models/lesson';
// import { DataSource } from 'typeorm';
// import { User } from "../models/user";

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
import mysql from 'mysql2/promise';
import dotenv from 'dotenv';

// Load environment variables from .env file
dotenv.config();

// Create a connection pool
export const connection = mysql.createPool({
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT),
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});

export default connection;
