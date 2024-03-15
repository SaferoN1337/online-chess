import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { Colors, ICoordinates, IPiece, ISquare, MoveData, gameHistoryMove } from "../../../../types";
import removeImpossibleMoves from "../gameSliceAdditionalFunctions/moveFunctions/removeImpossibleMoves";
import allMovesOfThePiece from "../gameSliceAdditionalFunctions/moveFunctions/allMovesOfThePiece";
import doesOpponentHaveAnyMove from "../gameSliceAdditionalFunctions/moveFunctions/doesOpponentHaveAnyMove";
import updateGemeHistory from "../gameSliceAdditionalFunctions/moveFunctions/updateHistory";
import renderDefaultPosition from "../gameSliceAdditionalFunctions/moveFunctions/renderDefaultPosition";

interface GameInitialState {
    currentPosition: ISquare[][],
    activePiece: null | IPiece,
    activePiecePosition: null | {
        X: number,
        Y: number
    },
    gameHistory: gameHistoryMove[],
    moveColor: Colors,
    movePieceModelTo: ICoordinates | null,
    promotionMove: null | MoveData
}

const initialState: GameInitialState = {
    currentPosition: renderDefaultPosition(),
    activePiece: null,
    activePiecePosition: null,
    gameHistory: [],
    moveColor: "white",
    movePieceModelTo: null,
    promotionMove: null
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
                state.activePiecePosition = {
                    X: action.payload.X,
                    Y: action.payload.Y
                };
            }
        },

        runAnimationAndSaveHistory(state, action: PayloadAction<MoveData>) {
            const currentPosition: ISquare[][] = [...state.currentPosition];
            const startSquare: ISquare = currentPosition[action.payload.startSquare.Y][action.payload.startSquare.X];
            const activePiece: IPiece = action.payload.piece;
            const endSquare: ISquare = currentPosition[action.payload.endSquare.Y][action.payload.endSquare.X];
            const killedPiece: IPiece | null = endSquare.piece ? { ...endSquare.piece } : null;

            startSquare.piece = null;
            state.activePiece = action.payload.piece;
            state.activePiecePosition = action.payload.startSquare;
            state.moveColor = activePiece.color === "white" ? "black" : "white";
            state.gameHistory = updateGemeHistory(state.gameHistory, activePiece, startSquare, endSquare, currentPosition, killedPiece);
            state.movePieceModelTo = { X: action.payload.endSquare.X, Y: action.payload.endSquare.Y };
            state.currentPosition = currentPosition.map(line => line.map((square) => {
                return { ...square, possibleMove: false }
            }));
        },

        movePiece(state, action: PayloadAction<{ X: number, Y: number }>) {
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

        showPiecePossibleMoves(state) {
            // console.time("123")
            if (!state.activePiece || !state.activePiecePosition) return;
            let listOfMoves: ICoordinates[] = [];
            const currentPosition = [...state.currentPosition].map((line) => line.map((square) => {
                return { ...square, possibleMove: false }
            }));

            const activePiecePositionCoordinates = { X: state.activePiecePosition.X, Y: state.activePiecePosition.Y }
            listOfMoves = allMovesOfThePiece(state.activePiece, activePiecePositionCoordinates, currentPosition);
            listOfMoves = removeImpossibleMoves(listOfMoves, state.activePiece, activePiecePositionCoordinates, currentPosition);

            listOfMoves.forEach(square => {
                currentPosition[square.Y][square.X].possibleMove = true;
            });
            // console.timeEnd("123")
            state.currentPosition = currentPosition;
        },

        showPromotionBlock(state, action: PayloadAction<MoveData | null>) {
            state.promotionMove = action.payload;
        }
    },
})

export const {
    updateActivePiece,
    movePiece,
    showPiecePossibleMoves,
    runAnimationAndSaveHistory,
    showPromotionBlock 
} = gameSlice.actions

export default gameSlice.reducer