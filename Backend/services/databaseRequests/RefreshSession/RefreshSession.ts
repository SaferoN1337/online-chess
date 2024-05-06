import mysql from "mysql2/promise";
import { config } from "../../../mysqlConfig";
import { CreateRefreshSession, DBRefreshSessionData, DeleteRefreshSession, GetRefreshSession } from "./RefreshSessionTypes";

class RefreshSession {
    static getRefreshSession: GetRefreshSession = async (refreshToken)=> {
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

    static createRefreshSession: CreateRefreshSession = async (id, refreshToken, accessToken, fingerprint)=> {
        const connection = await mysql.createConnection(config);
        try {
            await connection.execute(`INSERT INTO refresh_session (user_id, refresh_token, access_token, fingerprint) VALUES ('${id}', '${refreshToken}', '${accessToken}', '${fingerprint.hash}')`);
        } catch (error) {
            console.log(error);
        } finally {
            connection.end();
        }
    }

    static deleteRefreshSession: DeleteRefreshSession = async (refreshToken)=> {
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