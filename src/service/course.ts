import { Response, Request } from "express";
import connection from '../config/database';
import { OkPacket, RowDataPacket } from "mysql2";

// Function to get all courses
export const getAllCourseService = async() => {
    const [courses] = await connection.query(`
        SELECT * FROM course
    `);
    console.log(courses)
    return courses;
}

export const getCourseByUrlNameService = async(urlName: string) => {

  const [courseRows] = await connection.query<RowDataPacket[]>(`
      SELECT * FROM course WHERE url = ?
  `, [urlName]);
  const course = courseRows[0];
  

  if (course) {
      const [totalLessonsRows] = await connection.query<RowDataPacket[]>(`
          SELECT COUNT(*) as totalLessons FROM lesson WHERE courseId = ?
      `, [course.id]);
      const totalLessons = totalLessonsRows[0].totalLessons;
      return { course, totalLessons };
  }

  return null;
}

export const getLessonFromACourseService = async(courseId: string, pageNumber: any, pageSize: any) => {
  
    const [lessons] = await connection.query(`
        SELECT * FROM lesson WHERE courseId = ? ORDER BY seqNo LIMIT ? OFFSET ?
    `, [courseId, pageSize, pageNumber * pageSize]);
    return lessons;
}

export const updateACourseService = async(courseId: string, change: object) => {
    const [result] = await connection.query<OkPacket>(`
        UPDATE course SET ? WHERE id = ?
    `, [change, courseId]);
    console.log(result)
    return result;
}

export const createACourseService = async(data: object) => {
  console.log(data)
  // Query to get the maximum seqNo
  const [getSeqNoRows] = await connection.query<RowDataPacket[]>(`
      SELECT MAX(seqNo) as max FROM course
  `);
  console.log(getSeqNoRows)
  // Parse the maximum seqNo and increment it
  const seqNo = (getSeqNoRows[0]?.max ?? 0) + 1;

  // Insert the new course with the incremented seqNo
  const [result] = await connection.query<OkPacket>(`
      INSERT INTO course SET ?
  `, [{ ...data, seqNo }]);

  // Get the inserted course ID
  const savedCourseId = result.insertId;

  // Query to fetch the newly inserted course by ID
  const [savedCourseRows] = await connection.query<RowDataPacket[]>(`
      SELECT * FROM course WHERE id = ?
  `, [savedCourseId]);

  return savedCourseRows[0];
}

export const deleteACourseService = async(courseId: string) => {
    const [lessonDeleteResult] = await connection.query<OkPacket>(`
        DELETE FROM lesson WHERE courseId = ?
    `, [courseId]);
  
    if (lessonDeleteResult.affectedRows === 0) {
        return false;
    }
    
    const [courseDeleteResult] = await connection.query<OkPacket>(`
        DELETE FROM course WHERE id = ?
    `, [courseId]);

    if (courseDeleteResult.affectedRows === 0) {
        return false;
    }

    return true;
}
