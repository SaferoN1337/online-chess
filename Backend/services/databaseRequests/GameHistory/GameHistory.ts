import mysql from "mysql2/promise";
import { config } from "../../../mysqlConfig";
import { GameHistoryMove } from "../../../../types";
import { DBGameHistoryMove, GetGameHistory, UpdateGameHistory } from "./GameHistoryTypes";

class GameHistory {
    static getGameHistory: GetGameHistory = async (id)=> {
        const connection = await mysql.createConnection(config);
        try {
            const [moves] = await connection.execute<DBGameHistoryMove[]>(`SELECT * FROM history WHERE gameId = '${id}';`);
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

    static updateGameHistory: UpdateGameHistory = async ({ type, color, startSquare, endSquare, killedPiece, check }, gameId)=> {
        const connection = await mysql.createConnection(config);
        try {
            await connection.execute(`INSERT INTO history (gameId, type, color, startSquare, endSquare, killedPiece, check) 
            VALUES('${gameId}', '${type}', '${color}', '${startSquare}', '${endSquare}', '${killedPiece}', '${check}');`);
            return true;
        } catch (error) {
            console.log(error);
            return false;
        } finally {
            connection.end();
        }
    }
}

export default GameHistory;