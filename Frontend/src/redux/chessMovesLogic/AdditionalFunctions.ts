import { Colors, ISquare, PieceTypes } from "../../../../types";
import Moves from "./Moves";
import { UpdateHistory } from "./chessMovesLogicTypes";

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

    static updateGemeHistory: UpdateHistory = (history, activePiece, startSquare, endSquare, position, killedPiece) => {
        const currenPosition: ISquare[][] = [...position].map(line => [...line].map(square => {
            return { ...square, piece: square.piece ? { ...square.piece } : null };
        }));
        currenPosition[endSquare.Y][endSquare.X].piece = activePiece;
        const opponentColor: Colors = activePiece.color === "white" ? "black" : "white";
    
        Moves.markAllAttackedSquares(currenPosition, opponentColor);
    
        const kingsPosition: ISquare = currenPosition.flat(2).find(square => square.piece?.color === opponentColor && square.piece.type === "king") as ISquare;
    
        const newMove = {
            id: history.length,
            color: activePiece.color,
            type: activePiece.type,
            startSquare: { X: startSquare.X, Y: startSquare.Y },
            endSquare: { X: endSquare.X, Y: endSquare.Y },
            killedPiece: killedPiece,
            check: kingsPosition.attacked
        }
        return [...history, newMove];
    }
    
}

export default AdditionalFunctions;