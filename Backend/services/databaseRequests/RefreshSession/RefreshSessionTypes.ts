import { FingerprintResult } from "express-fingerprint";
import { RowDataPacket } from "mysql2";

export interface DBRefreshSessionData extends RowDataPacket {
    id: number,
    user_id: number,
    refresh_token: string,
    access_token: string,
    fingerprint: string
}

export type GetRefreshSession = (refreshToken: string) => Promise<DBRefreshSessionData[]>

export type CreateRefreshSession = (
    id: number,
    refreshToken: string,
    accessToken: string,
    fingerprint: FingerprintResult
) => Promise<void>

export type DeleteRefreshSession = (refreshToken: string) => Promise<void>