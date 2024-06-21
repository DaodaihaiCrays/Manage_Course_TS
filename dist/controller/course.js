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
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteCourseController = exports.createCourseController = exports.updateCourseController = exports.getLeesonFromACourseController = exports.getCourseByUrlNameController = exports.getAllCourseController = void 0;
const course_1 = require("../service/course");
const getAllCourseController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield (0, course_1.getAllCourseService)();
        if (result !== null) {
            res.status(200).json({
                success: {
                    code: 200,
                    message: "Success",
                    data: result
                }
            });
        }
        else {
            res.status(400).json({
                error: {
                    code: 400,
                    message: "Cannot get list of courses"
                }
            });
        }
    }
    catch (error) {
        res.status(500).json({
            error: {
                code: 500,
                message: "An error occurred while fetching courses"
            }
        });
    }
});
exports.getAllCourseController = getAllCourseController;
const getCourseByUrlNameController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const url = req.params.courseUrl;
        if (!url) {
            res.status(400).json({
                error: {
                    code: 400,
                    message: "Cannot get the course"
                }
            });
        }
        const result = yield (0, course_1.getCourseByUrlNameService)(url);
        if (result !== null) {
            res.status(200).json({
                success: {
                    code: 200,
                    message: "Success",
                    data: result
                }
            });
        }
        else {
            res.status(400).json({
                error: {
                    code: 400,
                    message: "Cannot get the courses"
                }
            });
        }
    }
    catch (error) {
        res.status(500).json({
            error: {
                code: 500,
                message: "An error occurred while fetching course"
            }
        });
    }
});
exports.getCourseByUrlNameController = getCourseByUrlNameController;
const getLeesonFromACourseController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const courseId = req.params.courseId;
        let pageNumber = req.query.pageNumber;
        let pageSize = req.query.pageSize;
        if (!courseId) {
            res.status(400).json({
                error: {
                    code: 400,
                    message: "Cannot find the course"
                }
            });
        }
        if (!pageNumber) {
            pageNumber = 0;
        }
        if (!pageSize) {
            pageSize = 3;
        }
        const result = yield (0, course_1.getLessonFromACourseService)(courseId, pageNumber, pageSize);
        if (result !== null) {
            res.status(200).json({
                success: {
                    code: 200,
                    message: "Success",
                    data: result
                }
            });
        }
        else {
            res.status(400).json({
                error: {
                    code: 400,
                    message: "Cannot get lessons from the courses"
                }
            });
        }
    }
    catch (error) {
        res.status(500).json({
            error: {
                code: 500,
                message: "An error occurred while fetching lessons from the course"
            }
        });
    }
});
exports.getLeesonFromACourseController = getLeesonFromACourseController;
const updateCourseController = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const courseId = req.params.courseId;
        const change = req.body;
        if (!courseId) {
            res.status(400).json({
                error: {
                    code: 400,
                    message: "Cannot find the course"
                }
            });
        }
        const result = yield (0, course_1.updateACourseService)(courseId, change);
        if (result.affected != 0) {
            res.status(200).json({
                success: {
                    code: 200,
                    message: "Success"
                }
            });
        }
        else {
            res.status(400).json({
                error: {
                    code: 400,
                    message: "Cannot update the courses"
                }
            });
        }
    }
    catch (error) {
        res.status(500).json({
            error: {
                code: 500,
                message: "An error occurred while fetching lessons from the course"
            }
        });
    }
});
exports.updateCourseController = updateCourseController;
const createCourseController = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const data = req.body;
        const result = yield (0, course_1.createACourseService)(data);
        if (result) {
            res.status(200).json({
                success: {
                    code: 200,
                    message: "Success",
                    data: result
                }
            });
        }
        else {
            res.status(400).json({
                error: {
                    code: 400,
                    message: "Cannot create the courses"
                }
            });
        }
    }
    catch (error) {
        res.status(500).json({
            error: {
                code: 500,
                message: "An error occurred while fetching lessons from the course"
            }
        });
    }
});
exports.createCourseController = createCourseController;
const deleteCourseController = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const courseId = req.params.courseId;
        if (!courseId) {
            res.status(400).json({
                error: {
                    code: 400,
                    message: "Cannot find the course"
                }
            });
        }
        const result = yield (0, course_1.deleteACourseService)(courseId);
        if (result) {
            res.status(200).json({
                success: {
                    code: 200,
                    message: "Success",
                    data: result
                }
            });
        }
        else {
            res.status(400).json({
                error: {
                    code: 400,
                    message: "Cannot update the courses"
                }
            });
        }
    }
    catch (error) {
        res.status(500).json({
            error: {
                code: 500,
                message: "An error occurred while fetching lessons from the course"
            }
        });
    }
});
exports.deleteCourseController = deleteCourseController;
