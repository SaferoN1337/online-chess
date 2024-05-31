import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { Colors, ICastlingData, ICoordinates, IGameData, IGameResult, IPiece, ISquare, ITimer, MoveData, GameHistoryMove } from "../../../../types";
import Moves from "../chessMovesLogic/Moves";
import SpecialMoves from "../chessMovesLogic/SpecialMoves";
import AdditionalFunctions from "../chessMovesLogic/AdditionalFunctions";

interface GameInitialState {
    currentPosition: ISquare[][],
    activePiece: null | IPiece,
    activePiecePosition: null | ICoordinates,
    gameHistory: GameHistoryMove[],
    moveColor: Colors,
    movePieceModelTo: ICoordinates | null,
    promotionMove: MoveData | null,
    castlingData: ICastlingData | null;
    timers: ITimer;
    gameResult: null | IGameResult;
}

const initialState: GameInitialState = {
    currentPosition: AdditionalFunctions.renderDefaultPosition(),
    activePiece: null,
    activePiecePosition: null,
    gameHistory: [],
    moveColor: "white",
    movePieceModelTo: null,
    promotionMove: null,
    castlingData: null,
    timers: {
        timeOfThelastMove: Date.now(),
        blackTimeLeft: 10,
        whiteTimeLeft: 10
    },
    gameResult: null
}

export const gameSlice = createSlice({
    name: "game",
    initialState,
    reducers: {
        updateActivePiece: (state, action: PayloadAction<{ piece: IPiece, X: number, Y: number } | null>) => {
            if (action.payload === null) {
                state.activePiece = null;
                state.activePiecePosition = null;
                state.currentPosition = [...state.currentPosition].map(row => row.map(square => {
                    square.possibleMove = false
                    return square;
                }));
            } else {
                state.activePiece = action.payload.piece;
                state.activePiecePosition = { X: action.payload.X, Y: action.payload.Y };
            }
        },

        runPieceMoveAnimation(state, action: PayloadAction<{ moveData: MoveData, gameHistoryMove: GameHistoryMove }>) {
            const moveData: MoveData = action.payload.moveData;
            const currentPosition: ISquare[][] = [...state.currentPosition];
            const startSquare: ISquare = currentPosition[moveData.startSquare.Y][moveData.startSquare.X];
            const piece: IPiece = moveData.piece;

            startSquare.piece = null;
            state.timers = moveData.timers;
            state.activePiece = moveData.piece;
            state.activePiecePosition = moveData.startSquare;
            state.moveColor = piece.color === "white" ? "black" : "white";
            state.gameHistory = [...state.gameHistory, action.payload.gameHistoryMove];
            state.movePieceModelTo = { X: moveData.endSquare.X, Y: moveData.endSquare.Y };
            state.timers = { ...state.timers, timeOfThelastMove: Date.now() };
            state.currentPosition = currentPosition.map(line => line.map((square) => {
                return { ...square, possibleMove: false }
            }));
        },

        movePiece(state, action: PayloadAction<ICoordinates>) {
            if (!state.activePiece || !state.activePiecePosition) return;
            const currentPosition: ISquare[][] = [...state.currentPosition];
            const activePiece: IPiece = state.activePiece;
            const endSquare: ISquare = currentPosition[action.payload.Y][action.payload.X];

            endSquare.piece = activePiece;
            state.currentPosition = currentPosition;
            state.activePiece = null;
            state.activePiecePosition = null;
            state.movePieceModelTo = null;
            const result = Moves.doesOpponentHaveAnyMove(currentPosition, activePiece.color === "white" ? "black" : "white");
            if (result) {
                state.gameResult = result;
            }
        },

        runCastlingAnimation(state, action: PayloadAction<{ moveData: MoveData, gameHistoryMove: GameHistoryMove }>) {
            const moveData: MoveData = action.payload.moveData;
            const currentPosition = state.currentPosition.map(line => line.map(square => { return { ...square, possibleMove: false } }));
            const startSquare = currentPosition[moveData.startSquare.Y][moveData.startSquare.X];
            const endSquare = currentPosition[moveData.endSquare.Y][moveData.endSquare.X];
            let castle: IPiece = currentPosition[startSquare.Y][7].piece as IPiece;
            const king: IPiece = currentPosition[startSquare.Y][startSquare.X].piece as IPiece;
            if (endSquare.X === 2) {
                castle = currentPosition[startSquare.Y][0].piece as IPiece;
            }
            currentPosition[startSquare.Y][endSquare.X === 2 ? 0 : 7].piece = null;
            startSquare.piece = null;

            let castlingData: ICastlingData = {
                castle: castle,
                castleCorrdinates: {
                    startSquare: { Y: startSquare.Y, X: endSquare.X === 2 ? 0 : 7 },
                    endSquare: { Y: startSquare.Y, X: endSquare.X === 2 ? 3 : 5 }
                },
                king: king,
                kingCorrdinates: {
                    startSquare: { Y: startSquare.Y, X: startSquare.X },
                    endSquare: { Y: endSquare.Y, X: endSquare.X }
                }
            };

            state.timers = moveData.timers;
            state.gameHistory = [...state.gameHistory, action.payload.gameHistoryMove];
            state.moveColor = moveData.piece.color === "white" ? "black" : "white";
            state.castlingData = castlingData;
            state.currentPosition = currentPosition;
        },

        castling(state) {
            if (!state.castlingData) return;
            const currentPosition = state.currentPosition;
            const castleEndSquare = state.castlingData.castleCorrdinates.endSquare;
            const kingEndSquare = state.castlingData.kingCorrdinates.endSquare;

            currentPosition[castleEndSquare.Y][castleEndSquare.X].piece = state.castlingData.castle;
            currentPosition[kingEndSquare.Y][kingEndSquare.X].piece = state.castlingData.king;

            currentPosition.map(line => line.map(square => square.possibleMove = false));
            const result = Moves.doesOpponentHaveAnyMove(currentPosition, state.castlingData.king.color === "white" ? "black" : "white");
            if (result) {
                state.gameResult = result;
            }

            state.castlingData = null;
            state.activePiece = null;
            state.activePiecePosition = null;
            state.timers = { ...state.timers, timeOfThelastMove: Date.now() };
        },

        showPiecePossibleMoves(state) {
            if (!state.activePiece || !state.activePiecePosition) return;
            let listOfMoves: ICoordinates[] = [];
            const currentPosition = [...state.currentPosition].map((line) => line.map((square) => {
                return { ...square, possibleMove: false }
            }));

            const activePiecePositionCoordinates = { X: state.activePiecePosition.X, Y: state.activePiecePosition.Y }
            listOfMoves = Moves.allMovesOfThePiece(state.activePiece, activePiecePositionCoordinates, currentPosition);
            listOfMoves = Moves.removeImpossibleMoves(listOfMoves, state.activePiece, activePiecePositionCoordinates, currentPosition);
            listOfMoves = [...listOfMoves, ...SpecialMoves.checkSpecialMovesPossibility(state.activePiece, activePiecePositionCoordinates, currentPosition, state.gameHistory)];
            listOfMoves.forEach(square => {
                currentPosition[square.Y][square.X].possibleMove = true;
            });
            state.currentPosition = currentPosition;
        },

        showPromotionBlock(state, action: PayloadAction<MoveData | null>) {
            state.promotionMove = action.payload;
        },

        updateTimer(state, action: PayloadAction<ITimer>) {
            state.timers = action.payload;
        },

        updateGameResult(state, action: PayloadAction<IGameResult>) {
            state.gameResult = action.payload;
        },

        updateGameData(state, action: PayloadAction<IGameData>) {
            state.currentPosition = action.payload.position;
            state.timers = action.payload.timers,
            state.gameResult = action.payload.result,
            state.moveColor = action.payload.moveColor
        }
    },
})

export const {
    updateActivePiece,
    movePiece,
    castling,
    showPiecePossibleMoves,
    runPieceMoveAnimation,
    runCastlingAnimation,
    showPromotionBlock,
    updateTimer,
    updateGameResult,
    updateGameData
} = gameSlice.actions

export default gameSlice.reducer