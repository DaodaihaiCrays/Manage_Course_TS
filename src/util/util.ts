import bcrypt from 'bcrypt'

const saltRounds = 10

export async function hashPassword(password: string): Promise<string> {
    const salt = await bcrypt.genSalt(saltRounds)   
    const hash = await bcrypt.hash(password, salt)   
    return hash   
}

export async function comparePassword(password: string, hash: string): Promise<boolean> {
    const isMatch = await bcrypt.compare(password, hash)   
    return isMatch   
}

export function validateEmail(email: string): boolean {
    const re = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/   
    return re.test(String(email).toLowerCase())   
}

