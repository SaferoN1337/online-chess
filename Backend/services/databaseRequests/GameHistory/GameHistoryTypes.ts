import { RowDataPacket } from "mysql2";
import { GameHistoryMove, ICoordinates, IPiece, ISquare } from "../../../../types";

export interface DBGameHistoryMove extends RowDataPacket, GameHistoryMove {
    gameId: number
}

export type GetGameHistory = (id: number)=> Promise<GameHistoryMove[]>
export type UpdateGameHistory = (gameHistoryMove: GameHistoryMove, gameId: number)=> Promise<boolean>