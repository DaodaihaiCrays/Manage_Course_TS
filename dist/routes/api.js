"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const course_1 = require("../controller/course");
const user_1 = require("../controller/user");
const routerAPI = express_1.default.Router();
routerAPI.get('/course', user_1.checkAuthController, course_1.getAllCourseController);
routerAPI.get('/course/:courseUrl', user_1.checkAuthController, course_1.getCourseByUrlNameController);
routerAPI.get('/course/:courseId/lessons', user_1.checkAuthController, course_1.getLeesonFromACourseController);
routerAPI.put('/course/:courseId', user_1.checkAuthController, course_1.updateCourseController);
routerAPI.post('/course', user_1.checkAuthController, course_1.createCourseController);
routerAPI.delete('/course/:courseId', user_1.checkAuthController, course_1.deleteCourseController);
routerAPI.post('/user/register', user_1.registerController);
routerAPI.post('/user/login', user_1.loginController);
exports.default = routerAPI;
