import { User } from "../models/user";
import { comparePassword, hashPassword, validateEmail } from "../util/util";
import connection from '../config/database';
import { RowDataPacket } from "mysql2";
import jwt from 'jsonwebtoken'

const stringToBoolean = (str: string | undefined): boolean => {
    if (str === undefined) return false;
    return str.toLowerCase() === 'true';
};

export const registerService = async (userData: User) => {
    try {
        const email = userData.email;

        const [existingUser] = await connection.query<RowDataPacket[]>(`
            SELECT * FROM user WHERE email = ?
        `, [email]);

        if (existingUser.length > 0 || !validateEmail(email)) {
            return 1;
        }

        const hashedPassword = await hashPassword(userData.passwordSalt);

        if(userData.isAdmin == true)


        await connection.execute(`
            INSERT INTO user (email, passwordSalt, pictureUrl, isAdmin)
            VALUES (?, ?, ?, ?)
        `, [userData.email, hashedPassword, userData.pictureUrl, userData.isAdmin]);

        return 0;
    } catch (error) {
        console.error("Error in registerService: ", error);
        throw new Error("Error registering user");
    }
};

export const loginService = async (userData: any) => {
    const email = userData.email;

    if (!validateEmail(email)) {
        return false;
    }

    const [userRows] = await connection.query<RowDataPacket[]>(`
        SELECT * FROM user WHERE email = ?
    `, [email]);

    const user = userRows[0];

    if (!user) {
        return null;
    }

    const checkPass = await comparePassword(userData.password, user.passwordSalt);

    if (checkPass) {
        const token = jwt.sign({
            email: email,
            id: user.id
        }, process.env.JWT_KEY!, { expiresIn: process.env.JWT_EXPIRE });

        return token;
    }

    return null;
};