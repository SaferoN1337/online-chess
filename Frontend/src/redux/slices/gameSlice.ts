import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { Colors, ICoordinates, IPiece, ISquare, PieceTypes, gameHistoryMove } from "../../types";
import removeImpossibleMoves from "../moveFunctions/removeImpossibleMoves";
import allMovesOfThePiece from "../moveFunctions/allMovesOfThePiece";
import doesOpponentHaveAnyMove from "../moveFunctions/doesOpponentHaveAnyMove";
import updateGemeHistory from "../moveFunctions/updateHistory";

interface GameInitialState {
    currentPosition: ISquare[][],
    activePiece: null | IPiece,
    activePiecePosition: null | {
        coordinateX: number,
        coordinateY: number
    },
    gameHistory: gameHistoryMove[],
    moveColor: Colors
    pieceModelCoordinates: ICoordinates | null
}

const initialState: GameInitialState = {
    currentPosition: [],
    activePiece: null,
    activePiecePosition: null,
    gameHistory: [],
    moveColor: "white",
    pieceModelCoordinates: { X: -1, Y: -1 }
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
                        let type: PieceTypes = "king";
                        let color: Colors = defaultData.coordinateY === 7 ? "black" : "white";

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

        runAnimationAndSaveHistory(state, action: PayloadAction<{ coordinateX: number, coordinateY: number }>) {
            if (!state.activePiece || !state.activePiecePosition) return;
            const currentPosition: ISquare[][] = [...state.currentPosition];
            const startSquare: ISquare = currentPosition[state.activePiecePosition.coordinateY][state.activePiecePosition.coordinateX];
            const activePiece: IPiece = state.activePiece;
            const endSquare: ISquare = currentPosition[action.payload.coordinateY][action.payload.coordinateX];
            const killedPiece: IPiece | null = endSquare.piece ? { ...endSquare.piece } : null;

            startSquare.piece = null;
            state.moveColor = activePiece.color === "white" ? "black" : "white";
            state.gameHistory = updateGemeHistory(state.gameHistory, activePiece, startSquare, endSquare, currentPosition, killedPiece);
            state.currentPosition = currentPosition.map(line => line.map((square) => {
                return { ...square, possibleMove: false }
            }));
            state.pieceModelCoordinates = { X: action.payload.coordinateX, Y: action.payload.coordinateY };
        },
        
        movePiece(state, action: PayloadAction<{ coordinateX: number, coordinateY: number }>) {
            if (!state.activePiece || !state.activePiecePosition) return;
            const currentPosition: ISquare[][] = [...state.currentPosition];
            const activePiece: IPiece = state.activePiece;
            const endSquare: ISquare = currentPosition[action.payload.coordinateY][action.payload.coordinateX];

            endSquare.piece = activePiece;
            state.currentPosition = currentPosition;
            state.activePiece = null;
            state.activePiecePosition = null;
            
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

            const activePiecePositionCoordinates = { X: state.activePiecePosition.coordinateX, Y: state.activePiecePosition.coordinateY }
            listOfMoves = allMovesOfThePiece(state.activePiece, activePiecePositionCoordinates, currentPosition);
            listOfMoves = removeImpossibleMoves(listOfMoves, state.activePiece, activePiecePositionCoordinates, currentPosition);

            listOfMoves.forEach(square => {
                currentPosition[square.Y][square.X].possibleMove = true;
            });
            // console.timeEnd("123")
            state.currentPosition = currentPosition;
            state.pieceModelCoordinates = { X: state.activePiecePosition.coordinateX, Y: state.activePiecePosition.coordinateY }
        },
    }
})

export const { renderDefaultPosition, updateActivePiece, movePiece, showPiecePossibleMoves, runAnimationAndSaveHistory } = gameSlice.actions

export default gameSlice.reducer