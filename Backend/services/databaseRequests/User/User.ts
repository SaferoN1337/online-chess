import mysql from "mysql2/promise";
import { CreateNewUser, DBIUser, GetUserByLoginOrId } from "./UserTypes";
import { config } from "../../../mysqlConfig";

class Users {
    static getUserByLoginOrId : GetUserByLoginOrId = async (parameter)=> {
        const connection = await mysql.createConnection(config);
        try {
            if (typeof parameter === "string") {
                const [users] = await connection.execute<DBIUser[]>(`SELECT * FROM users WHERE login = '${parameter}'`);
                return users[0];
            } else if (typeof parameter === "number") {
                const [users] = await connection.execute<DBIUser[]>(`SELECT * FROM users WHERE id = '${parameter}'`);
                return users[0];
            }
        } catch (error) {
            console.log(error);
            return;
        } finally {
            connection.end();
        }
    }

    static createNewUser: CreateNewUser = async (login, email, hashedPassword)=> {
        const connection = await mysql.createConnection(config);
        try {
            await connection.execute(`INSERT INTO users (login, email, password) VALUES ('${login}', '${email}', '${hashedPassword}');`);
            const [users] = await connection.execute<DBIUser[]>(`SELECT * FROM users WHERE login = '${login}';`);
            return users[0];
        } catch (error) {
            console.log(error);
            return null;
        } finally {
            connection.end();
        }
    }
}

export default Users;