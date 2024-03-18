import { ICoordinates, ISquare, SpecialMoves } from "../../../../../types";
import markAllAttackedSquares from "../moveFunctions/markAllAttackedSquares";

const castling: SpecialMoves = (piece, coordinates, position, history) => {
    const doesItKingOnStartPosition = piece.type === "king" && coordinates.X === 4 && (piece.color === "white" && coordinates.Y === 0 || piece.color === "black" && coordinates.Y === 7);

    if (!doesItKingOnStartPosition) {
        return [];
    }
    const currentPosition: ISquare[][] = [...position].map(line => [...line].map(square => { return { ...square } }));
    let allPossibleMoves: ICoordinates[] = [];
    let kingSideCastlingPossible: boolean = true;
    let queenSideCastlingPossible: boolean = true;

    markAllAttackedSquares(currentPosition, piece.color);
    if (currentPosition[coordinates.Y][coordinates.X].attacked) {
        return [];
    }

    currentPosition[coordinates.Y].forEach((square, index) => {
        if (square.attacked && (index === 2 || index === 3 || index === 4)) {
            queenSideCastlingPossible = false;
        }
        if (index > 0 && index < 4 && square.piece !== null) {
            queenSideCastlingPossible = false;
        }
        if (index === 0 && square.piece?.type !== "castle") {
            queenSideCastlingPossible = false;
        }

        if (square.attacked && (index === 4 || index === 5 || index === 6)) {
            kingSideCastlingPossible = false;
        }
        if (index < 7 && index > 4 && square.piece !== null) {
            kingSideCastlingPossible = false;
        }
        if (index === 7 && square.piece?.type !== "castle") {
            kingSideCastlingPossible = false;
        }
    });

    if (!queenSideCastlingPossible && !kingSideCastlingPossible) {
        return [];
    }

    const castlesAndKingHistory = history.filter(move => move.color === piece.color && (move.type === "king" || move.type === "castle"));
    castlesAndKingHistory.forEach(move => {
        const startSquare = move.startSquare;
        if (startSquare.X === 0) {
            queenSideCastlingPossible = false;
        } else if (startSquare.X === 4) {
            kingSideCastlingPossible = false;
            queenSideCastlingPossible = false;
        } else if (startSquare.X === 7) {
            kingSideCastlingPossible = false;
        }
    });

    if (kingSideCastlingPossible) {
        allPossibleMoves.push({ X: 6, Y: coordinates.Y });
    }
    if (queenSideCastlingPossible) {
        allPossibleMoves.push({ X: 2, Y: coordinates.Y });
    }

    return allPossibleMoves;
}

export default castling;