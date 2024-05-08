import mysql from "mysql2/promise";
import { config } from "../../../mysqlConfig";
import { CreateNewGame, DBGameData, DBGameHistoryMove, GetGameDataById, GetGameHistory, UpdateGameDataAfterMove, UpdateGameResult } from "./GameTypes";
import { GameHistoryMove } from "../../../../types";

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
            return games[0];
        } catch (error) {
            console.log(error);
            return undefined;
        } finally {
            connection.end();
        }
    }

    static createNewGame: CreateNewGame = async (player1, player2, position) => {
        const connection = await mysql.createConnection(config);
        try {
            await connection.execute(`INSERT INTO games (player1, player2, position) 
            VALUES ('${player1 ? player1 : null}', '${player2 ? player2 : null}', '${JSON.stringify(position)}')'`);
            const [games] = await connection.execute<DBGameData[]>(`SELECT * FROM games 
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

    static updateGameDataAfterMove: UpdateGameDataAfterMove = async (id, position, timers)=> {
        const connection = await mysql.createConnection(config);
        try {
            await connection.execute(`UPDATE games SET position = '${position}', timers='${timers}' WHERE id = '${id}'`)
            return true;
        } catch (error) {
            console.log(error);
            return false;
        } finally {
            connection.end();
        }
    }

    static updateGameResult: UpdateGameResult= async (id, gameResult)=> {
        const connection = await mysql.createConnection(config);
        try {
            await connection.execute(`UPDATE games SET gameResult = '${gameResult}' WHERE id = '${id}'`);
            return true;
        } catch (error) {
            console.log(error);
            return false;
        } finally {
            connection.end();
        }
    }

    static getGameHistory: GetGameHistory = async (id)=> {
        const connection = await mysql.createConnection(config);
        try {
            const [moves] = await connection.execute<DBGameHistoryMove[]>(`SELECT * FROM history WHERE gameId = '${id}'`);
            const listOfMoves: GameHistoryMove[] = moves.map((move)=> {
                return {
                    id: move.id,
                    type: move.type,
                    color: move.color,
                    startSquare: move.startSquare,
                    endSquare: move.endSquare,
                    killedPiece: move.killedPiece,
                    check: move.check
                }
            });

            return listOfMoves;
        } catch (error) {
            console.log(error);
            return [];
        } finally {
            connection.end();
        }
    }
}

export default Game;
