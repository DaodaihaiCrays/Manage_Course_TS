import { Response, Request } from "express"   
import connection from '../config/database'   
import { User } from "../models/user"   
import {hashPassword, comparePassword, validateEmail} from "../util/util"
import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'

dotenv.config()

if (dotenv.config().error) {
    console.log("Cannot load .env file")   
    process.exit(1)   
  }

(async () => {
    try {  
      await connection.initialize()
  
    } catch (error) {
      console.log("Cannot connect to database", error)   
      process.exit(1)   
    }
})()   

export const registerService = async(userData: User) => { 
    const repository =  connection.getRepository(User)

    const email = userData.email
    const user = await repository.createQueryBuilder("user")
        .where("email = :email", {email})
        .getOne()   
   
    if (user || !validateEmail(email)) {
        return 1
    }

    const hashedPassword = await hashPassword(userData.passwordSalt)

    const userNew = connection.getRepository(User)
    .create({
        email: userData.email,
        passwordSalt: hashedPassword,
        pictureUrl: userData.pictureUrl,
        isAdmin: userData.isAdmin
    })   
  
   
    await repository.save(userNew)   
  
    return 0   
}

export const loginService = async(userData: any) => { 
    const repository =  connection.getRepository(User)

    const email = userData.email
    if(!validateEmail(email))
        return false

    const user = await repository.createQueryBuilder("user")
        .where("email = :email", {email})
        .getOne()   
    console.log(user)
    if (!user) {
        return null
    }

    const checkPass: Boolean = await comparePassword(userData.password, user.passwordSalt)

    if(checkPass) {
        const token = jwt.sign({
            email: email,
            id: user['id']
        }, process.env.JWT_KEY!, { expiresIn: process.env.JWT_EXPIRE})
        return token
    }

    return null
}