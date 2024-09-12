import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, OneToMany } from "typeorm"   
import { Lesson } from "./lesson"   

export class Course {

    id!: number   

    seqNo!: number   

    url!:string   

    title!: string   

    iconUrl!: string   

    longDescription!: string   

    category!: string   

    @OneToMany(() => Lesson, lesson => lesson.course)
    lessons!: Lesson[]   

    @CreateDateColumn()
    createAt!: Date   

    @UpdateDateColumn()
    updateAt !: Date
}

