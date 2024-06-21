"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const api_1 = __importDefault(require("./routes/api"));
dotenv_1.default.config();
if (dotenv_1.default.config().error) {
    console.log("Cannot load .env file");
    process.exit(1);
}
// (async () => {
//     try {  
//       await connection.initialize()
//         .then(() => {
//             console.log("The datasource has been initialized successfully.");
//         })
//         .catch(err => {
//             console.log("Error during datasource initialization.", err);
//             process.exit(1);
//         });
//       console.log("Connected to database successfully");
//       const courses = Object.values(COURSES) as DeepPartial<Course>[];
//       const courseRepository = connection.getRepository(Course);
//       const lessonsRepository = connection.getRepository(Lesson);
//       // await lessonsRepository.delete({})
//       // await courseRepository.delete({})
//       for (let courseData of courses) {
//           // console.log(`Inserting course ${courseData.title}`);
//           const course = courseRepository.create(courseData);
//           await courseRepository.save(course);
//           if (courseData.lessons) {
//               for (let lessonData of courseData.lessons) {
//                   // console.log(`Inserting lesson ${lessonData.title}`);
//                   const lesson = lessonsRepository.create(lessonData);
//                   lesson.course = course;
//                   await lessonsRepository.save(lesson);
//               }
//           }
//       }
//     } catch (error) {
//       console.log("Cannot connect to database", error);
//       process.exit(1);
//     }
// })();
const app = (0, express_1.default)();
const port = process.env.PORT || 3001;
app.use(express_1.default.json()); // Used to parse JSON bodies
app.use(express_1.default.urlencoded()); //Parse URL-encoded bodies
// app.route("/").get((req, res) => res.send("Hello World"));
app.use('/v1', api_1.default);
app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});
