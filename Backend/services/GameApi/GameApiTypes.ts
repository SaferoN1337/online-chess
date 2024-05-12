import { Request, Response } from "express";
import { IGameResult, ISquare, ITimer, SearchParameters } from "../../../types";

interface ReqGameData extends Request {
    body: {
        id: number
    }
} 

interface ReqListOfGames extends Request {
    body: {
        parameters: SearchParameters
    }
} 

export type RequestGameData = (req: ReqGameData, res: Response)=> void

export type RequestListOfGames = (req: ReqListOfGames, res: Response)=> void