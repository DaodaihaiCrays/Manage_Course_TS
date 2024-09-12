import {
    getAllCourseService,
    getCourseByUrlNameService,
    getLessonFromACourseService,
    updateACourseService,
    createACourseService,
    deleteACourseService
} from "../service/course"
import { NextFunction, Request, Response } from "express"

export const getAllCourseController = async (req: Request, res: Response) => {
    try {
        
        const result = await getAllCourseService();
   
        if (result !== null) {
            res.status(200).json({
                success: {
                    code: 200,
                    message: "Success",
                    data: result
                }
            })
        } else {
            res.status(400).json({
                error: {
                    code: 400,
                    message: "Cannot get list of courses"
                }
            })
        }
    } catch (error) {
        res.status(500).json({
            error: {
                code: 500,
                message: "An error occurred while fetching courses"
            }
        })
    }
}

export const getCourseByUrlNameController = async (req: Request, res: Response) => {
    try {
        const url = req.params.courseUrl

        if(!url) {
            res.status(400).json({
                error: {
                    code: 400,
                    message: "Cannot get the course"
                }
            })   
        }

        const result = await getCourseByUrlNameService(url);
   
        if (result !== null) {
            res.status(200).json({
                success: {
                    code: 200,
                    message: "Success",
                    data: result
                }
            });
        } else {
            res.status(400).json({
                error: {
                    code: 400,
                    message: "Cannot get the courses"
                }
            });
        }
    } catch (error) {
        res.status(500).json({
            error: {
                code: 500,
                message: "An error occurred while fetching course"
            }
        });
    }
};

export const getLessonFromACourseController = async (req: Request, res: Response) => {
    try {
        const courseId = req.params.courseId
        
        let pageNumber: any = req.query.pageNumber
        let pageSize: any = req.query.pageSize

        if(!courseId) {
            res.status(400).json({
                error: {
                    code: 400,
                    message: "Cannot find the course"
                }
            });  
        }

        if(!pageNumber) {
            pageNumber = 0
        }

        if(!pageSize) {
            pageSize = 3 
        }      
        
        const result = await getLessonFromACourseService(courseId, pageNumber, pageSize);
   
        if (result !== null) {
            res.status(200).json({
                success: {
                    code: 200,
                    message: "Success",
                    data: result
                }
            });
        } else {
            res.status(400).json({
                error: {
                    code: 400,
                    message: "Cannot get lessons from the courses"
                }
            });
        }
    } catch (error) {
        res.status(500).json({
            error: {
                code: 500,
                message: "An error occurred while fetching lessons from the course"
            }
        });
    }
};

export const updateCourseController = async (req: Request, res: Response) => {
    try {
        const courseId = req.params.courseId;
        const change: object = req.body;

        if (!courseId) {
            return res.status(400).json({
                error: {
                    code: 400,
                    message: "Cannot find the course"
                }
            });
        }

        const result = await updateACourseService(courseId, change);

        if (result.affectedRows !== 0) {
            return res.status(200).json({
                success: {
                    code: 200,
                    message: "Success"
                }
            });
        } else {
            return res.status(400).json({
                error: {
                    code: 400,
                    message: "Cannot update the course"
                }
            });
        }
    } catch (error) {
        return res.status(500).json({
            error: {
                code: 500,
                message: "An error occurred while updating the course"
            }
        });
    }
};

export const createCourseController = async (req: Request, res: Response) => {
    try {
        
        const data:object = req.body

        const result = await createACourseService(data);
   
        if (result) {
            res.status(200).json({
                success: {
                    code: 200,
                    message: "Success",
                    data: result
                }
            });
        } else {
            res.status(400).json({
                error: {
                    code: 400,
                    message: "Cannot create the courses"
                }
            });
        }
    } catch (error) {
        res.status(500).json({
            error: {
                code: 500,
                message: "An error occurred while fetching lessons from the course"
            }
        });
    }
};

export const deleteCourseController = async (req: Request, res: Response) => {
    try {
        
        const courseId = req.params.courseId

        if(!courseId) {
            res.status(400).json({
                error: {
                    code: 400,
                    message: "Cannot find the course"
                }
            });  
        }

        const result = await deleteACourseService(courseId)
   
        if (result) {
            res.status(200).json({
                success: {
                    code: 200,
                    message: "Success",
                    data: result
                }
            });
        } else {
            res.status(400).json({
                error: {
                    code: 400,
                    message: "Cannot delete the course"
                }
            });
        }
    } catch (error) {
        res.status(500).json({
            error: {
                code: 500,
                message: "An error occurred while fetching lessons from the course"
            }
        });
    }
};