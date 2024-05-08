import { RowDataPacket } from "mysql2"
import { ISquare, IGameResult, IGameData, ITimer, GameHistoryMove } from "../../../../types";

export interface DBGameData extends RowDataPacket, IGameData {}
export interface DBGameHistoryMove extends RowDataPacket, GameHistoryMove {
    gameId: number
}

export type GetGameDataById = (id: number) => Promise<DBGameData | undefined>

export type CreateNewGame = (
    player1: undefined | string, 
    player2: undefined | string,
    position: ISquare[][]
) => Promise<DBGameData | undefined>

export type UpdateGameDataAfterMove = (
    id: number, 
    position: ISquare[][], 
    timers: ITimer,
)=> Promise<boolean> 

export type UpdateGameResult = (id: number, gameResult: IGameResult)=> Promise<boolean>; 
export type GetGameHistory = (id: number)=> Promise<GameHistoryMove[]>