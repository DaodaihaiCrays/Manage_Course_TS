import { Response, Request } from "express"   
import { Course } from "../models/course"   
import connection from '../config/database'   
import { Lesson } from "../models/lesson"   
import { get } from "http"   

(async () => {
    try {  
      await connection.initialize()
  
    } catch (error) {
      console.log("Cannot connect to database", error)   
      process.exit(1)   
    }
})()   

export const getAllCourseService = async() => { 
    const courses = await connection
        .getRepository(Course)
        .createQueryBuilder("courses")
        .orderBy("courses.seqNo")
        .leftJoinAndSelect("courses.lessons", "lesson")
        .getMany()   
    
    return courses
}

export const getCourseByUrlNameService = async(urlName: string) => { 
  const course = await connection
      .getRepository(Course)
      .findOneBy({
        url: urlName
      })   
  
  if(course) {
      const totalLessons = await connection
      .getRepository(Lesson)
      .createQueryBuilder("lessons")
      .where("lessons.courseId = :courseId", {
          courseId: course.id
      })
      .getCount()
      return {course, totalLessons}
  }

  return null
}

export const getLessonFromACourseService = async(courseId: string, pageNumber: any, pageSize: any) => { 
  const lesson = await connection
    .getRepository(Lesson)
    .createQueryBuilder("lessons")
    .where("lessons.courseId = :courseId", {courseId})
    .orderBy("lessons.seqNo")
    .skip(pageNumber * pageSize)
    .take(pageSize)
    .getMany()   

  return lesson
}

export const updateACourseService = async(courseId: string, change: object) => { 
  const result = await connection
    .createQueryBuilder()
    .update(Course)
    .set(change)
    .where("id = :courseId", {courseId})
    .execute()   

  return result
}

export const createACourseService = async(data: object) => { 
  const reponsitory = connection.getRepository(Course)   

  const getSeqNo = await reponsitory
    .createQueryBuilder("courses")
    .select("MAX(courses.seqNo)", "max")
    .getRawOne()   

  const course = connection.getRepository(Course)
  .create({
      ...data,
      seqNo: ( getSeqNo?.max ?? 0 ) + 1 
  })   

  const savedCourse = await reponsitory.save(course)   

  return savedCourse   
}

export const deleteACourseService = async(courseId: string) => { 
  const reponsitoryCourse = connection.getRepository(Course)   
  const reponsitoryLessons = connection.getRepository(Lesson)   

  let check = await reponsitoryLessons
      .createQueryBuilder()
      .delete()
      .from(Lesson)
      .where("courseId = :courseId", { courseId })
      .execute()   

  if(!check)
    return false

  check = await reponsitoryCourse 
      .createQueryBuilder()
      .delete()
      .from(Course)
      .where("id = :courseId", { courseId })
      .execute()   

  if(!check)
    return false

  return true
}