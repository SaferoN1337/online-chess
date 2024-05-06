import mysql from "mysql2/promise";
import { config } from "../../../mysqlConfig";
import { CreateNewGame, DBGame, GetGameDataById } from "./GameTypes";

class Game {
    static getGameDataById: GetGameDataById = async (id) => {
        const connection = await mysql.createConnection(config);
        try {
            const [games] = await connection.execute<DBGame[]>(`SELECT * FROM games WHERE id = '${id}'`);
            return games[0];
        } catch (error) {
            console.log(error);
            return undefined;
        } finally {
            connection.end();
        }
    }

    static creatNewGame: CreateNewGame = async (player1, player2, position) => {
        const connection = await mysql.createConnection(config);
        try {
            await connection.execute(`INSERT INTO games (player1, player2, position) 
            VALUES ('${player1 ? player1 : null}', '${player2 ? player2 : null}', '${JSON.stringify(position)}')'`);
            const [games] = await connection.execute<DBGame[]>(`SELECT * FROM games 
                WHERE player1 = '${player1 ? player1 : null}' 
                AND player2 ='${player2 ? player2 : null}' 
                AND position = '${JSON.stringify(position)}' 
            ORDER BY id DESC`);
            return games[0];
        } catch (error) {
            console.log(error);
            return undefined;
        } finally {
            connection.end();
        }
    }

    static updatePosition = async ()=> {
        const connection = await mysql.createConnection(config);
        try {
            
        } catch (error) {
            console.log(error);
        } finally {
            connection.end();
        }
    }
}

export default Game;
