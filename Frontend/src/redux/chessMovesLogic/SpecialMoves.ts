import Moves from "./Moves";
import { ICoordinates, ISquare, GameHistoryMove } from "../../../../types";
import { RemoveOpponentPawnIfEnPassant, SpecialMovesParameters } from "./chessMovesLogicTypes";

class SpecialMoves {
    static checkSpecialMovesPossibility: SpecialMovesParameters = (piece, coordinates, currentPosition, history) => {
        let listOfMoves: ICoordinates[] = [];

        if (piece.type === "king") {
            listOfMoves = [...listOfMoves, ...this.castling(piece, coordinates, currentPosition, history)];
        } else if (piece.type === "pawn") {
            listOfMoves = [...listOfMoves, ...this.enPassant(piece, coordinates, currentPosition, history)];
        }

        return listOfMoves;
    }

    static castling: SpecialMovesParameters = (piece, coordinates, position, history) => {
        const doesItKingOnStartPosition = piece.type === "king" && coordinates.X === 4 && (piece.color === "white" && coordinates.Y === 0 || piece.color === "black" && coordinates.Y === 7);

        if (!doesItKingOnStartPosition) {
            return [];
        }
        const currentPosition: ISquare[][] = [...position].map(line => [...line].map(square => { return { ...square } }));
        let allPossibleMoves: ICoordinates[] = [];
        let kingSideCastlingPossible: boolean = true;
        let queenSideCastlingPossible: boolean = true;

        Moves.markAllAttackedSquares(currentPosition, piece.color);
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

    static enPassant: SpecialMovesParameters = (piece, coordinates, position, history) => {
        const currentPosition: ISquare[][] = [...position].map(line => [...line].map(square => { return { ...square } }));
        const listOfMoves: ICoordinates[] = [];
        const opponentPawnStartLineIndex: number = piece.color === "white" ? 6 : 1;
        const lastMove: GameHistoryMove = { ...history[history.length - 1] };

        if (!lastMove || lastMove.type !== "pawn" || lastMove.color === piece.color) {
            return [];
        }

        if (lastMove.startSquare.Y === opponentPawnStartLineIndex) {
            const isItClosestColumn: boolean = lastMove.startSquare.X === coordinates.X + 1 || lastMove.startSquare.X === coordinates.X - 1;
            if (piece.color === "white" && coordinates.Y === 4 && isItClosestColumn) {
                listOfMoves.push({ X: lastMove.startSquare.X, Y: coordinates.Y + 1 });
            } else if (piece.color === "black" && coordinates.Y === 3 && isItClosestColumn) {
                listOfMoves.push({ X: lastMove.startSquare.X, Y: coordinates.Y - 1 });
            }
        }

        if (listOfMoves.length > 0) {
            currentPosition[coordinates.Y][coordinates.X].piece = null;
            currentPosition[listOfMoves[0].Y][listOfMoves[0].X].piece = piece;
            Moves.markAllAttackedSquares(currentPosition, piece.color);

            const kingsPosition: ISquare = [...currentPosition].flat(2).find(s => s.piece?.color === piece.color && s.piece.type === "king") as ISquare;
            if (kingsPosition.attacked) {
                return [];
            }
        }

        return listOfMoves
    }

    static removeOpponentPawnIfEnPassant: RemoveOpponentPawnIfEnPassant = (position, gameHistoryMove, gameHistory) => {
        if(gameHistory.length === 0) return position;
        
        const lastEnemyMove = gameHistory[gameHistory.length - 1];
        const isItClosestColumn = lastEnemyMove.endSquare.X + 1 === gameHistoryMove.startSquare.X || lastEnemyMove.endSquare.X - 1 === gameHistoryMove.startSquare.X;
        const correctStartPosition = (lastEnemyMove.startSquare.Y === 6 && lastEnemyMove.color === "black") || (lastEnemyMove.startSquare.Y === 1 && lastEnemyMove.color === "white");
        const correctEndPosition = gameHistoryMove.endSquare.X === lastEnemyMove.endSquare.X && gameHistoryMove.startSquare.Y === lastEnemyMove.endSquare.Y && isItClosestColumn; 
        const bothPiecesTypeArePawn =  gameHistoryMove.type === "pawn" && lastEnemyMove.type === "pawn";

        if (correctStartPosition && bothPiecesTypeArePawn && correctEndPosition ) {
            position[lastEnemyMove.endSquare.Y][lastEnemyMove.endSquare.X].piece = null;
        }

        return position;
    }
}

export default SpecialMoves