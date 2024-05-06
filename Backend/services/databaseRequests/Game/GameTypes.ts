import { RowDataPacket } from "mysql2"
import { ISquare, IGameResult } from "../../../../types";

export interface DBGame extends RowDataPacket {
    id: number,
    position: string,
    player1: string,
    player2: string,
    status: null | IGameResult
}

export type GetGameDataById = (id: number) => Promise<DBGame | undefined>
export type CreateNewGame = (
    player1: undefined | string, 
    player2: undefined | string,
    position: ISquare[][]
) => Promise<DBGame | undefined>