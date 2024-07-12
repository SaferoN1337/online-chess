import mysql from "mysql2/promise";
import { config } from "../../../mysqlConfig";
import { CreateNewGame, DBGameData, GetGameDataById, UpdateGameDataAfterMove, UpdateGameResult } from "./GameTypes";
import { IGameData, IGameResult, ISquare, ITimer } from "../../../../types";

class Game {
    // static async getGamesUsingParameters() {
    //     const connection = await mysql.createConnection(config);
    //     try {
    //         const [games] = await connection.execute<DBGame[]>(`SELECT * FROM games WHERE id = '${id}'`);
    //         return games[0];
    //     } catch (error) {
    //         console.log(error);
    //         return undefined;
    //     } finally {
    //         connection.end();
    //     }
    // }

    static getGameDataById: GetGameDataById = async (id) => {
        const connection = await mysql.createConnection(config);
        try {
            const [games] = await connection.execute<DBGameData[]>(`SELECT * FROM games WHERE id = '${id}'`);
            return this.parseDBGameData(games[0]);
        } catch (error) {
            console.log(error);
            return undefined;
        } finally {
            connection.end();
        }
    }

    static createNewGame: CreateNewGame = async (player1, player2, position, timers) => {
        const connection = await mysql.createConnection(config);
        try {
            await connection.execute(`INSERT INTO games (player1, player2, position, timers) 
            VALUES ('${player1 ? player1 : null}', '${player2 ? player2 : null}', '${JSON.stringify(position)}', '${timers}')'`);
            const [games] = await connection.execute<DBGameData[]>(`SELECT * FROM games WHERE player1 = '${player1 ? player1 : null}' 
                AND player2 ='${player2 ? player2 : null}' AND position = '${JSON.stringify(position)}' ORDER BY id DESC`);
            return this.parseDBGameData(games[0]);
        } catch (error) {
            console.log(error);
            return;
        } finally {
            connection.end();
        }
    }

    static updateGameDataAfterMove: UpdateGameDataAfterMove = async (id, position, timers) => {
        const connection = await mysql.createConnection(config);
        try {
            await connection.execute(`UPDATE games SET position = '${JSON.stringify(position)}', timers='${JSON.stringify(timers)}' WHERE id = '${id}'`);
            return true;
        } catch (error) {
            console.log(error);
            return false;
        } finally {
            connection.end();
        }
    }

    static updateGameResult: UpdateGameResult = async (id, gameResult) => {
        const connection = await mysql.createConnection(config);
        try {
            await connection.execute(`UPDATE games SET gameResult = '${JSON.stringify(gameResult)}' WHERE id = '${id}'`);
            return true;
        } catch (error) {
            console.log(error);
            return false;
        } finally {
            connection.end();
        }
    }

    static parseDBGameData = (DBGameData: DBGameData | undefined) => {
        if (!DBGameData) return;
    
        const parsedTimers: ITimer = JSON.parse(DBGameData.timers);
        const parsedPosition: ISquare[][] = JSON.parse(DBGameData.position);
        const parsedResult: null | IGameResult = DBGameData.result !== null ? JSON.parse(DBGameData.result) : null;
    
        const gameData: IGameData = {
            id: DBGameData.id,
            position: parsedPosition,
            player1: DBGameData.player1,
            player2: DBGameData.player2,
            timers: parsedTimers,
            result: parsedResult,
            moveColor: DBGameData.moveColor
        }

        return gameData;
    }
}

export default Game;
