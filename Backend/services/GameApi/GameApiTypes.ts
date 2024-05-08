import { Request, Response } from "express";
import { IGameResult, ISquare, ITimer } from "../../../types";

interface ReqGameData extends Request {
    body: {
        id: number
    }
} 

export type RequestGameData = (req: ReqGameData, res: Response)=> void
