import { ICoordinates, IPiece, ISquare } from "../../types";
import markAllAttackedSquares from "./markAllAttackedSquares";

type Function = (
    listOfMoves: ICoordinates[],
    piece: IPiece,
    pieceCoordinates: ICoordinates,
    currentPosition: ISquare[][]
) => ICoordinates[];

export const removeImpossibleMoves: Function = (listOfMoves, piece, pieceCoordinates, currentPosition) => {
    const possibleMoves: ICoordinates[] = [];

    listOfMoves.forEach(({ X, Y }) => {
        const potentialPosition: ISquare[][] = [...currentPosition].map(line => [...line].map(square => { return { ...square } }));
        potentialPosition[pieceCoordinates.Y][pieceCoordinates.X].piece = null;
        potentialPosition[Y][X].piece = { ...piece };

        markAllAttackedSquares(potentialPosition, piece.color);

        const kingsPosition: ISquare = [...potentialPosition].flat(2).find(s => s.piece?.color === piece.color && s.piece.type === "king") as ISquare;
        if (kingsPosition.attacked === false) {
            possibleMoves.push({ X, Y });
        }
    });

    return possibleMoves;
}

export default removeImpossibleMoves;