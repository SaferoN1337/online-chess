import { CheckMoves, ICoordinates } from "../../types";
import bishopPossibleMoves from "./movesOfSpecificPieces/bishopPossibleMoves";
import castlePossibleMoves from "./movesOfSpecificPieces/castlePossibleMoves";
import kingPossibleMoves from "./movesOfSpecificPieces/kingPossibleMoves";
import knightPossibleMoves from "./movesOfSpecificPieces/knightPossibleMoves";
import pawnPossibleMoves from "./movesOfSpecificPieces/pawnPossibleMoves";

const allMovesOfThePiece: CheckMoves = (activePiece, coordinates, currentPosition)=> {
    let allPossibleMoves: ICoordinates[] = [];

    if (activePiece.type === "pawn") {
        allPossibleMoves = pawnPossibleMoves(activePiece, coordinates, currentPosition);
    } else if (activePiece.type === "knight") {
        allPossibleMoves = knightPossibleMoves(activePiece, coordinates, currentPosition);
    } else if (activePiece.type === "bishop") {
        allPossibleMoves = bishopPossibleMoves(activePiece, coordinates, currentPosition);
    } else if (activePiece.type === "castle") {
        allPossibleMoves = castlePossibleMoves(activePiece, coordinates, currentPosition);
    } else if (activePiece.type === "queen") {
        allPossibleMoves = [
            ...bishopPossibleMoves(activePiece, coordinates, currentPosition),
            ...castlePossibleMoves(activePiece, coordinates, currentPosition)
        ];
    } else if (activePiece.type === "king") {
        allPossibleMoves = kingPossibleMoves(activePiece, coordinates, currentPosition);
    }

    return allPossibleMoves;
}

export default allMovesOfThePiece;