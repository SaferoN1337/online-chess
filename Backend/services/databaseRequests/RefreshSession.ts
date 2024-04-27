import mysql from "mysql2/promise";
import { config } from "../../mysqlConfig";
import { FingerprintResult } from "express-fingerprint";
import { DBRefreshSessionData } from "./DBRequestsTypes";

class RefreshSession {
    static async getRefreshSession(refreshToken: string) {
        const connection = await mysql.createConnection(config);
        try {
            const [sessions] = await connection.execute<DBRefreshSessionData[]>(`SELECT * FROM refresh_session WHERE refresh_token = '${refreshToken}'`);
            return sessions;
        } catch (error) {
            console.log(error);
            return [];
        } finally {
            connection.end();
        }
    }

    static async createRefreshSession(id: number, refreshToken: string, accessToken: string, fingerprint: FingerprintResult) {
        const connection = await mysql.createConnection(config);
        try {
            await connection.execute(`INSERT INTO refresh_session (user_id, refresh_token, access_token, fingerprint) VALUES ('${id}', '${refreshToken}', '${accessToken}', '${fingerprint.hash}')`);
        } catch (error) {
            console.log(error);
        } finally {
            connection.end();
        }
    }

    static async deleteRefreshSession(refreshToken: string) {
        const connection = await mysql.createConnection(config);
        try {
            await connection.execute(`DELETE FROM refresh_session WHERE refresh_token = '${refreshToken}'`);
        } catch (error) {
            console.log(error);
        } finally {
            connection.end();
        }
    }
}

export default RefreshSession;