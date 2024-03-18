import { ICoordinates, SpecialMoves } from "../../../../../types";
import castling from "./castling";
import enPassant from "./enPassant";

const checkSpecialMoves: SpecialMoves = (piece, coordinates, currentPosition, history)=> {
    let listOfMoves: ICoordinates[] = [];

    if(piece.type === "king") {
        listOfMoves = [...listOfMoves, ...castling(piece, coordinates, currentPosition, history)];
    } else if(piece.type === "pawn") {
        listOfMoves = [...listOfMoves, ...enPassant(piece, coordinates, currentPosition, history)];
    }

    return listOfMoves;
}

export default checkSpecialMoves;