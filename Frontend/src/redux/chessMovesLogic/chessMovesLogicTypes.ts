import { ICoordinates, IGameResult, IPiece, ISquare, GameHistoryMove } from "../../../../types";

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
    playerColor: "white" | "black",
)=> IGameResult | null

export type SpecialMovesParameters = (
    piece: IPiece,
    coordinates: ICoordinates,
    position: ISquare[][],
    history: GameHistoryMove[]
) => ICoordinates[]

export type UpdateHistory = (
    history: GameHistoryMove[],
    activePiece: IPiece,
    startSquare: ISquare,
    endSquare: ISquare,
    position: ISquare[][],
    killedPiece: IPiece | null
) => GameHistoryMove[]

export type CreateGameHistoryLine = (
    position: ISquare[][],
    piece: IPiece,
    startSquare: ICoordinates,
    endSquare: ICoordinates,
    lastMoveId: GameHistoryMove | undefined
)=> GameHistoryMove

export type RemoveOpponentPawnIfEnPassant= (
    position: ISquare[][],
    gameMoveData: GameHistoryMove,
    history: GameHistoryMove[]
)=> ISquare[][]