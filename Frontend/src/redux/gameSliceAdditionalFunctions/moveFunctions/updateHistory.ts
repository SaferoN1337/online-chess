import { Colors, IPiece, ISquare, gameHistoryMove } from "../../../../../types";
import markAllAttackedSquares from "./markAllAttackedSquares";

type Function = (
    history: gameHistoryMove[],
    activePiece: IPiece,
    startSquare: ISquare,
    endSquare: ISquare,
    position: ISquare[][],
    killedPiece: IPiece | null
) => gameHistoryMove[]

const updateGemeHistory: Function = (history, activePiece, startSquare, endSquare, position, killedPiece) => {
    const currenPosition: ISquare[][] = [...position].map(line => [...line].map(square => { 
        return { ...square, piece: square.piece ? { ...square.piece } : null } 
    }));
    currenPosition[endSquare.Y][endSquare.X].piece = { ...activePiece };
    const opponentColor: Colors = activePiece.color === "white" ? "black" : "white";

    markAllAttackedSquares(currenPosition, opponentColor);

    const kingsPosition: ISquare = currenPosition.flat(2).find(square => square.piece?.color === opponentColor && square.piece.type === "king") as ISquare;

    return [...history.map(move => { return { ...move } }),
    {
        id: history.length,
        color: activePiece.color,
        type: activePiece.type,
        startSquare: { X: startSquare.X, Y: startSquare.Y },
        endSquare: { X: endSquare.X, Y: endSquare.Y },
        killedPiece: killedPiece,
        check: kingsPosition.attacked
    }];
}

export default updateGemeHistory;