import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, ManyToMany, ManyToOne, JoinColumn } from "typeorm"   
import {Course} from "./course"

export class Lesson {
    id!: number   


    title!: string   


    duration!: string   

 
    seqNo!: number   

    course!: Course   

    createAt!: Date   

    updateAt!: Date
}

module.exports = {
    Lesson
}
