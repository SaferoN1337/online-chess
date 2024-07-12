import { RowDataPacket } from "mysql2";
import { Colors, GameHistoryMove, IPiece, PieceTypes } from "../../../../types";

export interface DBGameHistoryMove extends RowDataPacket {
    gameId: number,
    id: number,
    type: PieceTypes,
    color: Colors,
    startSquare: string,
    endSquare: string,
    killedPiece: null | IPiece,
    check: boolean
}

export type GetGameHistory = (id: number)=> Promise<GameHistoryMove[]>
export type UpdateGameHistory = (gameHistoryMove: GameHistoryMove, gameId: number)=> Promise<boolean>