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
exports.deleteACourseService = exports.createACourseService = exports.updateACourseService = exports.getLessonFromACourseService = exports.getCourseByUrlNameService = exports.getAllCourseService = void 0;
const course_1 = require("../models/course");
const database_1 = __importDefault(require("../config/database"));
const lesson_1 = require("../models/lesson");
(() => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield database_1.default.initialize();
    }
    catch (error) {
        console.log("Cannot connect to database", error);
        process.exit(1);
    }
}))();
const getAllCourseService = () => __awaiter(void 0, void 0, void 0, function* () {
    const courses = yield database_1.default
        .getRepository(course_1.Course)
        .createQueryBuilder("courses")
        .orderBy("courses.seqNo")
        .leftJoinAndSelect("courses.lessons", "lesson")
        .getMany();
    return courses;
});
exports.getAllCourseService = getAllCourseService;
const getCourseByUrlNameService = (urlName) => __awaiter(void 0, void 0, void 0, function* () {
    const course = yield database_1.default
        .getRepository(course_1.Course)
        .findOneBy({
        url: urlName
    });
    if (course) {
        const totalLessons = yield database_1.default
            .getRepository(lesson_1.Lesson)
            .createQueryBuilder("lessons")
            .where("lessons.courseId = :courseId", {
            courseId: course.id
        })
            .getCount();
        return { course, totalLessons };
    }
    return null;
});
exports.getCourseByUrlNameService = getCourseByUrlNameService;
const getLessonFromACourseService = (courseId, pageNumber, pageSize) => __awaiter(void 0, void 0, void 0, function* () {
    const lesson = yield database_1.default
        .getRepository(lesson_1.Lesson)
        .createQueryBuilder("lessons")
        .where("lessons.courseId = :courseId", { courseId })
        .orderBy("lessons.seqNo")
        .skip(pageNumber * pageSize)
        .take(pageSize)
        .getMany();
    return lesson;
});
exports.getLessonFromACourseService = getLessonFromACourseService;
const updateACourseService = (courseId, change) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield database_1.default
        .createQueryBuilder()
        .update(course_1.Course)
        .set(change)
        .where("id = :courseId", { courseId })
        .execute();
    return result;
});
exports.updateACourseService = updateACourseService;
const createACourseService = (data) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const reponsitory = database_1.default.getRepository(course_1.Course);
    const getSeqNo = yield reponsitory
        .createQueryBuilder("courses")
        .select("MAX(courses.seqNo)", "max")
        .getRawOne();
    // Tạo một thực thể Course mới
    const course = database_1.default.getRepository(course_1.Course)
        .create(Object.assign(Object.assign({}, data), { seqNo: ((_a = getSeqNo === null || getSeqNo === void 0 ? void 0 : getSeqNo.max) !== null && _a !== void 0 ? _a : 0) + 1 // Cách tính seqNo đơn giản
     }));
    // Lưu thực thể vào cơ sở dữ liệu
    const savedCourse = yield reponsitory.save(course);
    return savedCourse;
});
exports.createACourseService = createACourseService;
const deleteACourseService = (courseId) => __awaiter(void 0, void 0, void 0, function* () {
    const reponsitoryCourse = database_1.default.getRepository(course_1.Course);
    const reponsitoryLessons = database_1.default.getRepository(lesson_1.Lesson);
    // Xóa các lesson theo courseId
    let check = yield reponsitoryLessons
        .createQueryBuilder()
        .delete()
        .from(lesson_1.Lesson)
        .where("courseId = :courseId", { courseId })
        .execute();
    if (!check)
        return false;
    // Xóa course theo courseId
    check = yield reponsitoryCourse
        .createQueryBuilder()
        .delete()
        .from(course_1.Course)
        .where("id = :courseId", { courseId })
        .execute();
    if (!check)
        return false;
    return true;
});
exports.deleteACourseService = deleteACourseService;
