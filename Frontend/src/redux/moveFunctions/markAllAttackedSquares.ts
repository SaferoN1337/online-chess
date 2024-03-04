import { ICoordinates, IPiece, ISquare } from "../../types";
import allMovesOfThePiece from "./allMovesOfThePiece";

type Function = (position: ISquare[][], playerColor: "white" | "black")=> void;

const markAllAttackedSquares: Function = (position, playerColor)=> {
    const listOfSquaresWithOpponentPiece: ISquare[] = position.flat(2).filter(square => square.piece !== null && square.piece.color !== playerColor);

    listOfSquaresWithOpponentPiece.forEach(square=> {
        const opponentPiece: IPiece = { ...square.piece } as IPiece;
        let movesOfOpponentPiece: ICoordinates[] = [];

        if (opponentPiece.type === "pawn") {
            const direction: number = opponentPiece.color === "white" ? 1 : -1;
            if (square.coordinateX - 1 >= 0) {
                movesOfOpponentPiece.push({ X: square.coordinateX - 1, Y: square.coordinateY + direction });
            }
            if (square.coordinateX + 1 <= 7) {
                movesOfOpponentPiece.push({ X: square.coordinateX + 1, Y: square.coordinateY + direction });
            }
        } else {
            movesOfOpponentPiece = allMovesOfThePiece(opponentPiece, { X: square.coordinateX, Y: square.coordinateY }, position);
        }

        movesOfOpponentPiece.forEach(move => {
            if (move.X >= 0 && move.X <= 7 && move.Y >= 0 && move.Y <= 7) {
                position[move.Y][move.X].attacked = true;
            }
        });
    });
}

export default markAllAttackedSquares;