export interface ISquare {
    possibleMove: boolean,
    attacked: boolean,
    coordinateX: number,
    coordinateY: number,
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
    currentPosition: ISquare[][]
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