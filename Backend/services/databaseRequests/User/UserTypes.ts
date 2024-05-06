import { RowDataPacket } from "mysql2";

export interface DBIUser extends RowDataPacket {
    id: number,
    login: string,
    password: string,
    email: string,
}

export type CreateNewUser = (
    login: string, 
    email: string, 
    hashedPassword: string
)=> Promise<DBIUser | null>

export type GetUserByLoginOrId = (parameter: string | number)=> Promise<DBIUser | undefined>