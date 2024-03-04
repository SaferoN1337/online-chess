export interface ISquare {
    possibleMove: boolean,
    attacked: boolean,
    coordinateX: number,
    coordinateY: number,
    piece: null | IPiece
}

export interface IPiece {
    color: "black" | "white",
    type: "king" | "queen" | "castle" | "bishop" | "knight" | "pawn",
}

export interface ICoordinates {
    X: number,
    Y: number
}

export type CheckMoves = (
    activePiece: IPiece,
    coordinates: ICoordinates,
    currentPosition: ISquare[][]
) => ICoordinates[]