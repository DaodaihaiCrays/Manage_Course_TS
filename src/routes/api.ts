import { Response, Request } from "express"   
import express from "express"   

import {
  getAllCourseController,
  getCourseByUrlNameController,
  getLeesonFromACourseController,
  updateCourseController,
  createCourseController,
  deleteCourseController
} from "../controller/course"

import {
  registerController,
  loginController,
  checkAuthController
} from "../controller/user"

const routerAPI = express.Router()

routerAPI.get('/course', checkAuthController, getAllCourseController)
routerAPI.get('/course/:courseUrl', checkAuthController, getCourseByUrlNameController)
routerAPI.get('/course/:courseId/lessons', checkAuthController, getLeesonFromACourseController)
routerAPI.put('/course/:courseId', checkAuthController, updateCourseController)
routerAPI.post('/course', checkAuthController, createCourseController)
routerAPI.delete('/course/:courseId', checkAuthController, deleteCourseController)

routerAPI.post('/user/register', registerController)
routerAPI.post('/user/login', loginController)
export default routerAPI