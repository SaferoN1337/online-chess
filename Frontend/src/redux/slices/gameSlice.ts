import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { ICoordinates, IPiece, ISquare } from "../../types";
import removeImpossibleMoves from "../moveFunctions/removeImpossibleMoves";
import allMovesOfThePiece from "../moveFunctions/allMovesOfThePiece";
import doesOpponentHaveAnyMove from "../moveFunctions/doesOpponentHaveAnyMove";

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

            state.currentPosition = emptyArrays.map((squaresList, lineIndex) => {
                return squaresList.map((_, columnIndex) => {
                    const defaultData: ISquare = {
                        possibleMove: false,
                        attacked: false,
                        coordinateX: columnIndex,
                        coordinateY: lineIndex,
                        piece: null
                    }

                    if (defaultData.coordinateY === 6 || defaultData.coordinateY === 1) {
                        defaultData.piece = {
                            color: defaultData.coordinateY === 6 ? "black" : "white",
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
            const currentPosition: ISquare[][] = [...state.currentPosition];
            const activePiece: IPiece = state.activePiece;
            const startSquare: ISquare = currentPosition[state.activePiecePosition.coordinateY][state.activePiecePosition.coordinateX];
            const endSquare: ISquare = currentPosition[action.payload.coordinateY][action.payload.coordinateX];

            endSquare.piece = state.activePiece;
            startSquare.piece = null;

            currentPosition[action.payload.coordinateY][action.payload.coordinateX] = endSquare;
            currentPosition[state.activePiecePosition.coordinateY][state.activePiecePosition.coordinateX] = startSquare;

            const newPosition = currentPosition.map(line=> line.map((square) => {
                return { ...square, possibleMove: false }
            }));

            state.currentPosition = newPosition;
            state.activePiece = null;
            state.activePiecePosition = null;

            console.time("findPossibleMoves")
            const { result, text } = doesOpponentHaveAnyMove(newPosition, activePiece.color === "white" ? "black" : "white");
            if (result === false && text) {
                setTimeout(() => {alert(`Игра завршена ${text} GG`)}, 100);
            }
            console.timeEnd("findPossibleMoves")
        },

        showPiecePossibleMoves(state) {
            console.time("123")
            if (!state.activePiece || !state.activePiecePosition) return;
            let listOfMoves: ICoordinates[] = [];
            const currentPosition = [...state.currentPosition].map((line) => line.map((square) => {
                return { ...square, possibleMove: false }
            }));

            const activePiecePositionCoordinates = { X: state.activePiecePosition.coordinateX, Y: state.activePiecePosition.coordinateY }
            listOfMoves = allMovesOfThePiece(state.activePiece, activePiecePositionCoordinates, currentPosition);
            listOfMoves = removeImpossibleMoves(listOfMoves, state.activePiece, activePiecePositionCoordinates, currentPosition);

            listOfMoves.forEach(square => {
                currentPosition[square.Y][square.X].possibleMove = true;
            });
            console.timeEnd("123")
            state.currentPosition = currentPosition;
        }
    }
})

export const { renderDefaultPosition, updateActivePiece, movePiece, showPiecePossibleMoves } = gameSlice.actions

export default gameSlice.reducer