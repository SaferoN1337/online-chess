import { ICoordinates, IPiece, ISquare, gameHistoryMove } from "../../../../types";

export type MarkAllAttackedSquares = (
    position: ISquare[][], 
    playerColor: "white" | "black"
) => void

export type RemoveImpossibleMoves = ( 
    listOfMoves: ICoordinates[], 
    piece: IPiece, 
    pieceCoordinates: ICoordinates, 
    currentPosition: ISquare[][]
) => ICoordinates[]

export type DoesOpponentHaveAnyMove = (
    position: ISquare[][], 
    playerColor: "white" | "black"
)=> { result: boolean, text?: string }

export type SpecialMovesParameters = (
    piece: IPiece,
    coordinates: ICoordinates,
    position: ISquare[][],
    history: gameHistoryMove[]
) => ICoordinates[]

export type UpdateHistory = (
    history: gameHistoryMove[],
    activePiece: IPiece,
    startSquare: ISquare,
    endSquare: ISquare,
    position: ISquare[][],
    killedPiece: IPiece | null
) => gameHistoryMove[]