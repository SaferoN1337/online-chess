import { RowDataPacket } from "mysql2";

export interface DBIUser extends RowDataPacket {
    id: number,
    login: string,
    password: string,
    email: string,
}

export interface DBRefreshSessionData extends RowDataPacket {
    id: number,
    user_id: number,
    refresh_token: string,
    access_token: string,
    fingerprint: string
}

