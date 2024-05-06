import { JwtPayload } from "jsonwebtoken";

export interface ISquare {
    possibleMove: boolean,
    attacked: boolean,
    X: number,
    Y: number,
    piece: null | IPiece
}

export interface IPiece {
    color: Colors,
    type: PieceTypes,
}

export type PieceTypes = "king" | "queen" | "castle" | "bishop" | "knight" | "pawn"

export type Colors = "black" | "white";

export interface ICoordinates {
    X: number,
    Y: number
}

export type CheckMoves = (
    activePiece: IPiece,
    coordinates: ICoordinates,
    currentPosition: ISquare[][],
) => ICoordinates[]

export interface gameHistoryMove {
    id: number,
    type: PieceTypes,
    color: Colors,
    startSquare: ICoordinates,
    endSquare: ICoordinates,
    killedPiece: null | IPiece,
    check: boolean
}

export interface MoveData {
    startSquare: ICoordinates,
    endSquare: ICoordinates,
    roomId: number,
    piece: IPiece,
    timers: ITimer
}

export interface ICastlingData {
    castle: IPiece,
    castleCorrdinates: {
        startSquare: ICoordinates,
        endSquare: ICoordinates,
    },
    king: IPiece,
    kingCorrdinates: {
        startSquare: ICoordinates,
        endSquare: ICoordinates,
    }
}

export interface ITimer {
    blackTimeLeft: number,
    whiteTimeLeft: number,
    timeOfThelastMove: number,
}

export interface IUser {
    id: number,
    login: string,
    password: string,
    email: string,
}

export interface IAccessTokenData {
    accessToken: string;
    accessTokenExpiration: number;
}

export interface IAlertData {
    type: "success" | "warning" | "danger",
    text: string
}

export interface Session extends JwtPayload {
    login: string,
    id: number,
    email: string,
    exp: number,
    iat: number
}

export interface IGameResult {
    "winner": Colors | "draw",
    "description": string
}

export interface IGameData {
    id: number,
    position: ISquare[][],
    player1: string,
    player2: string,
    timers: ITimer,
    result: null | IGameResult
}

export type Loading = "loading" | "fulfilled"