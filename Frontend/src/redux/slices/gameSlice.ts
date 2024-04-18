import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { Colors, ICastlingData, ICoordinates, IPiece, ISquare, ITimer, MoveData, gameHistoryMove } from "../../../../types";
import removeImpossibleMoves from "../gameSliceAdditionalFunctions/moveFunctions/removeImpossibleMoves";
import allMovesOfThePiece from "../gameSliceAdditionalFunctions/moveFunctions/allMovesOfThePiece";
import doesOpponentHaveAnyMove from "../gameSliceAdditionalFunctions/moveFunctions/doesOpponentHaveAnyMove";
import updateGemeHistory from "../gameSliceAdditionalFunctions/moveFunctions/updateHistory";
import renderDefaultPosition from "../gameSliceAdditionalFunctions/moveFunctions/renderDefaultPosition";
import checkUnusualMoves from "../gameSliceAdditionalFunctions/specialMoves/checkSpecialMoves";

interface GameInitialState {
    currentPosition: ISquare[][],
    activePiece: null | IPiece,
    activePiecePosition: null | ICoordinates,
    gameHistory: gameHistoryMove[],
    moveColor: Colors,
    movePieceModelTo: ICoordinates | null,
    promotionMove: MoveData | null,
    castlingData: ICastlingData | null;
    timers: ITimer;
}

const initialState: GameInitialState = {
    currentPosition: renderDefaultPosition(),
    activePiece: null,
    activePiecePosition: null,
    gameHistory: [],
    moveColor: "white",
    movePieceModelTo: null,
    promotionMove: null,
    castlingData: null,
    timers: {
        timeOfThelastMove: Date.now(),
        blackTimeLeft: 300,
        whiteTimeLeft: 300
    }
}

export const gameSlice = createSlice({
    name: "game",
    initialState,
    reducers: {
        updateActivePiece: (state, action: PayloadAction<{ piece: IPiece, X: number, Y: number } | null>) => {
            if (action.payload === null) {
                state.activePiece = null;
                state.activePiecePosition = null;
            } else {
                state.activePiece = action.payload.piece;
                state.activePiecePosition = { X: action.payload.X, Y: action.payload.Y };
            }
        },

        runPieceMoveAnimation(state, action: PayloadAction<MoveData>) {
            const history: gameHistoryMove[] = state.gameHistory;
            const currentPosition: ISquare[][] = [...state.currentPosition];
            const startSquare: ISquare = currentPosition[action.payload.startSquare.Y][action.payload.startSquare.X];
            const piece: IPiece = action.payload.piece;
            const endSquare: ISquare = currentPosition[action.payload.endSquare.Y][action.payload.endSquare.X];
            let killedPiece: IPiece | null = endSquare.piece ? { ...endSquare.piece } : null;

            if (piece.type === "pawn") {
                const lastOpponentMove: gameHistoryMove | undefined = history[history.length - 1];
                const opponentPawnStartLineIndex: number = piece.color === "white" ? 6 : 1;

                if (lastOpponentMove && lastOpponentMove.startSquare.Y === opponentPawnStartLineIndex) {
                    const isItClosestColumn: boolean = lastOpponentMove.startSquare.X === startSquare.X + 1 || lastOpponentMove.startSquare.X === startSquare.X - 1;
                    const direction: number = piece.color === "white" ? 1 : -1;

                    if (((piece.color === "white" && startSquare.Y === 4) || (piece.color === "black" && startSquare.Y === 3)) && isItClosestColumn) {
                        if (lastOpponentMove.startSquare.X === endSquare.X, startSquare.Y + direction === endSquare.Y) {
                            killedPiece = { type: lastOpponentMove.type, color: lastOpponentMove.color };
                            currentPosition[lastOpponentMove.endSquare.Y][lastOpponentMove.endSquare.X].piece = null;
                        }
                    }
                }
            }

            startSquare.piece = null;
            state.timers = action.payload.timers;
            state.activePiece = action.payload.piece;
            state.activePiecePosition = action.payload.startSquare;
            state.moveColor = piece.color === "white" ? "black" : "white";
            state.gameHistory = updateGemeHistory(state.gameHistory, piece, startSquare, endSquare, currentPosition, killedPiece);
            state.movePieceModelTo = { X: action.payload.endSquare.X, Y: action.payload.endSquare.Y };
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
            const { result, text } = doesOpponentHaveAnyMove(currentPosition, activePiece.color === "white" ? "black" : "white");
            if (result === false && text) {
                setTimeout(() => { alert(`Игра завршена ${text} GG`) }, 100);
            }
        },

        runCastlingAnimation(state, action: PayloadAction<MoveData>) {
            const currentPosition = state.currentPosition.map(line => line.map(square => { return { ...square, possibleMove: false } }));
            const startSquare = currentPosition[action.payload.startSquare.Y][action.payload.startSquare.X];
            const endSquare = currentPosition[action.payload.endSquare.Y][action.payload.endSquare.X];
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

            state.timers = action.payload.timers;
            state.gameHistory = updateGemeHistory(state.gameHistory, king, startSquare, endSquare, currentPosition, null);
            state.moveColor = action.payload.piece.color === "white" ? "black" : "white";
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
            const { result, text } = doesOpponentHaveAnyMove(currentPosition, state.castlingData.king.color === "white" ? "black" : "white");
            if (result === false && text) {
                setTimeout(() => { alert(`Игра завршена ${text} GG`) }, 100);
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
            listOfMoves = allMovesOfThePiece(state.activePiece, activePiecePositionCoordinates, currentPosition);
            listOfMoves = removeImpossibleMoves(listOfMoves, state.activePiece, activePiecePositionCoordinates, currentPosition);
            listOfMoves = [...listOfMoves, ...checkUnusualMoves(state.activePiece, activePiecePositionCoordinates, currentPosition, state.gameHistory)];
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
    updateTimer
} = gameSlice.actions

export default gameSlice.reducer