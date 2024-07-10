import { NextFunction, Request, Response } from "express"  
import {
    registerService,
    loginService
} from "../service/user"
import jwt, { JwtPayload } from 'jsonwebtoken'
import dotenv from 'dotenv'

dotenv.config()


export const registerController = async (req: Request, res: Response) => {
    try {
        // console.log(typeof req.body)
        const result = await registerService(req.body)
   
        if (result==0) {
            res.status(200).json({
                success: {
                    code: 200,
                    message: "Success",
                    
                }
            })  
        } else {
            res.status(400).json({
                error: {
                    code: 400,
                    message: "Cannot register"
                }
            })  
        }
    } catch (error) {
        res.status(500).json({
            error: {
                code: 500,
                message: "An error occurred while creating an user"
            }
        })  
    }
}  

export const loginController = async (req: Request, res: Response) => {
    try {
        // console.log(typeof req.body)
        const result = await loginService(req.body)
   
        if (result) {
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
                    message: "Email or password is wrong."
                }
            })  
        }
    } catch (error) {
        res.status(500).json({
            error: {
                code: 500,
                message: "An error occurred while login"
            }
        })  
    }
}  

export const checkAuthController = async(req: Request, res: Response, next: NextFunction) => {
    try {
        const token = req.headers.authorization!.split(" ")[1]  
        const decodedToken = jwt.verify(token, process.env.JWT_KEY!) as JwtPayload 
        (req as any).user = decodedToken  
    
        next()
    } catch (error) {
        return res.status(400).json({
            error : {
                code: 400,
                message: "Invalid or expired token provided!"
            }
        })
    }
}