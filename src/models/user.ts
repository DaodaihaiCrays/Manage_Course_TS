import {Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn} from "typeorm"   


export class User {

    id!: number   

    email!: string   

    passwordSalt!: string   

    pictureUrl!: string   

    isAdmin!: boolean   

    createdAt!: Date   

    lastUpdatedAt!: Date   
}