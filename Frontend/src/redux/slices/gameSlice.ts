import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { ICoordinates, IPiece, ISquare } from "../../types";
import checkPawnPossibleMoves from "../checkPossibleMoves/checkPawnPossibleMoves";
import checkKnightPossibleMoves from "../checkPossibleMoves/checkKnightPossibleMoves";
import checkBishopPossibleMoves from "../checkPossibleMoves/checkBishopPossibleMoves";
import checkCastlePossibleMoves from "../checkPossibleMoves/checkCastlePossibleMoves";
import checkKingPossibleMoves from "../checkPossibleMoves/checkKingPossibleMoves";

interface GameInitialState {
    currentPosition: ISquare[][],
    activePiece: null | IPiece,
    activePiecePosition: null | {
        coordinateX: number,
        coordinateY: number
    }
}

const initialState: GameInitialState = {
    currentPosition: [],
    activePiece: null,
    activePiecePosition: null
}

export const gameSlice = createSlice({
    name: "game",
    initialState,
    reducers: {
        renderDefaultPosition: (state) => {
            const emptyArrays: ISquare[][] = new Array(8).fill(new Array(8).fill(undefined));

            state.currentPosition = emptyArrays.map((squaresList, rowIndex) => {
                return squaresList.map((_, columnIndex) => {
                    const defaultData: ISquare = {
                        possibleMove: false,
                        blocked: false,
                        coordinateX: columnIndex,
                        coordinateY: rowIndex,
                        piece: null
                    }

                    if (defaultData.coordinateY === 6 || defaultData.coordinateY === 1) {
                        defaultData.piece = {
                            color: defaultData.coordinateY === 6 ? "black" : "white",
                            url: defaultData.coordinateY === 6 ? "black-pawn.png" : "white-pawn.png",
                            type: "pawn"
                        }
                    } else if (defaultData.coordinateY === 0 || defaultData.coordinateY === 7) {
                        let type: "king" | "queen" | "castle" | "bishop" | "knight" | "pawn" = "king";
                        let color: "black" | "white" = defaultData.coordinateY === 7 ? "black" : "white";

                        if (defaultData.coordinateX === 0 || defaultData.coordinateX === 7) {
                            type = "castle";
                        } else if (defaultData.coordinateX === 1 || defaultData.coordinateX === 6) {
                            type = "knight";
                        } else if (defaultData.coordinateX === 2 || defaultData.coordinateX === 5) {
                            type = "bishop";
                        } else if (defaultData.coordinateX === 3) {
                            type = "queen";
                        }

                        defaultData.piece = {
                            color: color,
                            url: `${color}-${type}.png`,
                            type: type
                        }
                    }

                    return defaultData
                });
            });
        },

        updateActivePiece: (state, action: PayloadAction<{ piece: IPiece, coordinateX: number, coordinateY: number } | null>) => {
            if (action.payload === null) {
                state.activePiece = null;
                state.activePiecePosition = null;
            } else {
                state.activePiece = action.payload.piece;
                state.activePiecePosition = {
                    coordinateX: action.payload.coordinateX,
                    coordinateY: action.payload.coordinateY
                };
            }
        },

        movePiece(state, action: PayloadAction<{ coordinateX: number, coordinateY: number }>) {
            if (!state.activePiece || !state.activePiecePosition) return;
            const currentPosition = [...state.currentPosition];
            
            const startSquare: ISquare = currentPosition[state.activePiecePosition.coordinateY][state.activePiecePosition.coordinateX];
            const endSquare: ISquare = currentPosition[action.payload.coordinateY][action.payload.coordinateX];

            endSquare.piece = state.activePiece;
            startSquare.piece = null;

            currentPosition[action.payload.coordinateY][action.payload.coordinateX] = endSquare;
            currentPosition[state.activePiecePosition.coordinateY][state.activePiecePosition.coordinateX] = startSquare;

            state.currentPosition = currentPosition.map((row) => row.map((square) => {
                return { ...square, possibleMove: false }
            }));

            state.activePiece = null;
            state.activePiecePosition = null;
        },

        showPiecePossibleMoves(state) {
            if (!state.activePiece || !state.activePiecePosition) return;
            let changedSquares: ICoordinates[] = [];
            const currentPosition = [...state.currentPosition].map((row) => row.map((square) => {
                return { ...square, possibleMove: false }
            }));

            const activePiecePositionCoordinates = { X : state.activePiecePosition.coordinateX, Y : state.activePiecePosition.coordinateY }
            if(state.activePiece.type === "pawn") {
                changedSquares = checkPawnPossibleMoves(state.activePiece, activePiecePositionCoordinates, currentPosition);
            } else if(state.activePiece.type === "knight") {
                changedSquares = checkKnightPossibleMoves(state.activePiece, activePiecePositionCoordinates, currentPosition);
            } else if(state.activePiece.type === "bishop") {
                changedSquares = checkBishopPossibleMoves(state.activePiece, activePiecePositionCoordinates, currentPosition);
            } else if(state.activePiece.type === "castle") {
                changedSquares = checkCastlePossibleMoves(state.activePiece, activePiecePositionCoordinates, currentPosition);
            } else if(state.activePiece.type === "queen") {
                changedSquares = [
                    ...checkBishopPossibleMoves(state.activePiece, activePiecePositionCoordinates, currentPosition),
                    ...checkCastlePossibleMoves(state.activePiece, activePiecePositionCoordinates, currentPosition)
                ];
            } else if(state.activePiece.type === "king") {
                changedSquares = checkKingPossibleMoves(state.activePiece, activePiecePositionCoordinates, currentPosition);
            }

            changedSquares.forEach(square=> {
                currentPosition[square.Y][square.X].possibleMove = true;
            });

            state.currentPosition = currentPosition;
        }
    }
})

export const { renderDefaultPosition, updateActivePiece, movePiece, showPiecePossibleMoves } = gameSlice.actions

export default gameSlice.reducer