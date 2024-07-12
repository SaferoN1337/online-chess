import { RowDataPacket } from "mysql2"
import { ISquare, IGameResult, IGameData, ITimer, Colors } from "../../../../types";

export interface DBGameData extends RowDataPacket {
    id: number,
    position: string,
    player1: string,
    player2: string,
    timers: string,
    result: null | string,
    moveColor: Colors
}

export type GetGameDataById = (id: number) => Promise<IGameData | undefined>

export type CreateNewGame = (
    player1: undefined | string, 
    player2: undefined | string,
    position: ISquare[][],
    timers: ITimer
) => Promise<IGameData | undefined>

export type UpdateGameDataAfterMove = (
    id: number, 
    position: ISquare[][], 
    timers: ITimer,
)=> Promise<boolean> 

export type UpdateGameResult = (id: number, gameResult: IGameResult)=> Promise<boolean>; 

