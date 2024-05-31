import { Colors, IPiece, ISquare, PieceTypes } from "../../../../types";
import Moves from "./Moves";
import { CreateGameHistoryLine } from "./chessMovesLogicTypes";

class AdditionalFunctions {
    static renderDefaultPosition() {
        const emptyArrays: ISquare[][] = new Array(8).fill(new Array(8).fill(undefined));
    
        return emptyArrays.map((squaresList, lineIndex) => squaresList.map((_, columnIndex) => {
            const defaultData: ISquare = {
                possibleMove: false,
                attacked: false,
                X: columnIndex,
                Y: lineIndex,
                piece: null
            };
    
            if (defaultData.Y === 6 || defaultData.Y === 1) {
                defaultData.piece = {
                    color: defaultData.Y === 6 ? "black" : "white",
                    type: "pawn"
                }
            } else if (defaultData.Y === 0 || defaultData.Y === 7) {
                let type: PieceTypes = "king";
                let color: Colors = defaultData.Y === 7 ? "black" : "white";
    
                if (defaultData.X === 0 || defaultData.X === 7) {
                    type = "castle";
                } else if (defaultData.X === 1 || defaultData.X === 6) {
                    type = "knight";
                } else if (defaultData.X === 2 || defaultData.X === 5) {
                    type = "bishop";
                } else if (defaultData.X === 3) {
                    type = "queen";
                }
    
                defaultData.piece = {
                    color: color,
                    type: type
                }
            }
    
            return defaultData;
        }));
    }

    static createGameHistoryMove: CreateGameHistoryLine = (position, piece, startSquare, endSquare, lastMove)=> {
        const currentPosition: ISquare[][] = [...position].map(line => [...line].map(square => {
            return { ...square, piece: square.piece ? { ...square.piece } : null };
        }));
        let killedPiece: IPiece | null = currentPosition[endSquare.Y][endSquare.X].piece;

        if (piece.type === "pawn" && lastMove) {
            const opponentPawnStartLineIndex: number = piece.color === "white" ? 6 : 1;

            if (lastMove && lastMove.startSquare.Y === opponentPawnStartLineIndex) {
                const isItClosestColumn: boolean = lastMove.startSquare.X === startSquare.X + 1 || lastMove.startSquare.X === startSquare.X - 1;
                const direction: number = piece.color === "white" ? 1 : -1;

                if (((piece.color === "white" && startSquare.Y === 4) || (piece.color === "black" && startSquare.Y === 3)) && isItClosestColumn) {
                    if (lastMove.startSquare.X === endSquare.X, startSquare.Y + direction === endSquare.Y) {
                        killedPiece = { type: lastMove.type, color: lastMove.color };
                        currentPosition[lastMove.endSquare.Y][lastMove.endSquare.X].piece = null;
                    }
                }
            }
        }

        currentPosition[endSquare.Y][endSquare.X].piece = piece;
        const opponentColor: Colors = piece.color === "white" ? "black" : "white";
        Moves.markAllAttackedSquares(currentPosition, opponentColor);
        const kingsPosition: ISquare = currentPosition.flat(2).find(square => square.piece?.color === opponentColor && square.piece.type === "king") as ISquare;
    
        const newMove = {
            id: lastMove ? lastMove.id + 1 : 0,
            color: piece.color,
            type: piece.type,
            startSquare: { X: startSquare.X, Y: startSquare.Y },
            endSquare: { X: endSquare.X, Y: endSquare.Y },
            killedPiece: killedPiece,
            check: kingsPosition.attacked
        }

        return newMove;
    }
}

export default AdditionalFunctions;