import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, OneToMany } from "typeorm"   
import { Lesson } from "./lesson"   

export @Entity({
    name: "course"
})
class Course {
    @PrimaryGeneratedColumn()
    id!: number   

    @Column()
    seqNo!: number   

    @Column()
    url!:string   

    @Column()
    title!: string   

    @Column()
    iconUrl!: string   

    @Column()
    longDescription!: string   

    @Column()
    category!: string   

    @OneToMany(() => Lesson, lesson => lesson.course)
    lessons!: Lesson[]   

    @CreateDateColumn()
    createAt!: Date   

    @UpdateDateColumn()
    updateAt !: Date
}

module.exports = {
    Course
}