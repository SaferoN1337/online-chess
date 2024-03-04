import { ICoordinates, IPiece, ISquare } from "../../types";
import allMovesOfThePiece from "./allMovesOfThePiece";
import markAllAttackedSquares from "./markAllAttackedSquares";
import removeImpossibleMoves from "./removeImpossibleMoves";

const doesOpponentHaveAnyMove = (position: ISquare[][], playerColor: "white" | "black"): { result: boolean, text?: string } => {
    const currenPosition: ISquare[][] = [...position].map(line => [...line].map(square => { return { ...square } }));
    const listOfPiece: ISquare[] = currenPosition.flat(2).filter(square => square.piece !== null && square.piece.color === playerColor);

    for (let i = 0; i < listOfPiece.length; i++) {
        const square: ISquare = listOfPiece[i];
        const coordinates: ICoordinates = { X: square.coordinateX, Y: square.coordinateY }

        let listOfMoves = allMovesOfThePiece(square.piece as IPiece, coordinates, position);

        listOfMoves = removeImpossibleMoves(listOfMoves, square.piece as IPiece, coordinates, position);
        if (listOfMoves.length !== 0) {
            return { result: true };
        }
    }

    markAllAttackedSquares(currenPosition, playerColor);
    
    const kingsPosition: ISquare = currenPosition.flat(2).find(square => square.piece?.color === playerColor && square.piece.type === "king") as ISquare;
    if (kingsPosition.attacked === true) {
        return { result: false, text: '"Мат"' };
    }
    return { result: false, text: '"Пат"' };
}

export default doesOpponentHaveAnyMove