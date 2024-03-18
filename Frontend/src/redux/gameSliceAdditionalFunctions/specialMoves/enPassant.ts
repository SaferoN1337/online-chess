import { ICoordinates, ISquare, SpecialMoves, gameHistoryMove } from "../../../../../types";
import markAllAttackedSquares from "../moveFunctions/markAllAttackedSquares";

const enPassant: SpecialMoves = (piece, coordinates, position, history) => {
    const currentPosition: ISquare[][] = [...position].map(line => [...line].map(square => { return { ...square } }));
    const listOfMoves: ICoordinates[] = [];
    const opponentPawnStartLineIndex: number = piece.color === "white" ? 6 : 1;
    const lastMove: gameHistoryMove = { ...history[history.length - 1] };

    if (!lastMove || lastMove.type !== "pawn" || lastMove.color === piece.color) {
        return [];
    }

    if (lastMove.startSquare.Y === opponentPawnStartLineIndex) {
        const isItClosestColumn: boolean = lastMove.startSquare.X === coordinates.X + 1 || lastMove.startSquare.X === coordinates.X - 1;
        if (piece.color === "white" && coordinates.Y === 4 && isItClosestColumn ) {
            listOfMoves.push({ X: lastMove.startSquare.X, Y: coordinates.Y + 1 });
        } else if (piece.color === "black" && coordinates.Y === 3 && isItClosestColumn ) {
            listOfMoves.push({ X: lastMove.startSquare.X, Y: coordinates.Y - 1 });
        }
    }

    if(listOfMoves.length > 0) {
        currentPosition[coordinates.Y][coordinates.X].piece = null;
        currentPosition[listOfMoves[0].Y][listOfMoves[0].X].piece = piece;
        markAllAttackedSquares(currentPosition, piece.color);

        const kingsPosition: ISquare = [...currentPosition].flat(2).find(s => s.piece?.color === piece.color && s.piece.type === "king") as ISquare;
        if (kingsPosition.attacked) {
            return [];
        }
    }

    return listOfMoves
}

export default enPassant;