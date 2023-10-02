import { compare, hash } from "bcrypt"

export const createPasswordhashed = async (password: string): Promise<string> => {
    const saltorRounds = 10
    return await hash(password, saltorRounds)
}

export const validatePassword = async (passaword: string, passowordHashed: string): Promise<boolean> => {
    return compare(passaword, passowordHashed)
}