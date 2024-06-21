import "reflect-metadata"   
import express from "express"   
import dotenv from 'dotenv'   
import connection from './config/database'   
import { COURSES, USERS } from "./models/db-data"   
import { Course } from "./models/course"   
import { Lesson } from "./models/lesson"   
import { DeepPartial } from "typeorm"   
import routerAPI from "./routes/api"
import { User } from "./models/user"   

dotenv.config()   

if (dotenv.config().error) {
  console.log("Cannot load .env file")   
  process.exit(1)   
}

const app = express()   
const port = process.env.PORT || 3001   

app.use(express.json())
app.use(express.urlencoded( ))    


app.use('/v1', routerAPI)

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)   
})   
