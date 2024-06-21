import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, ManyToMany, ManyToOne, JoinColumn } from "typeorm"   
import {Course} from "./course"
@Entity({ name: "lesson" })
export class Lesson {
    @PrimaryGeneratedColumn()
    id!: number   

    @Column()
    title!: string   

    @Column()
    duration!: string   

    @Column()
    seqNo!: number   

    @ManyToOne(() => Course, course => course.lessons)
    @JoinColumn({
        name: "courseId"
    })
    course!: Course   

    @CreateDateColumn()
    createAt!: Date   

    @UpdateDateColumn()
    updateAt!: Date
}

module.exports = {
    Lesson
}
