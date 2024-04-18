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

export type SpecialMoves = (
    piece: IPiece,
    coordinates: ICoordinates,
    position: ISquare[][],
    history: gameHistoryMove[]
) => ICoordinates[]

export interface ITimer {
    blackTimeLeft: number,
    whiteTimeLeft: number,
    timeOfThelastMove: number,
}