import { CheckMoves, ICoordinates } from "../../../../../../types";

const pawnPossibleMoves: CheckMoves = (activePiece, coordinates, currentPosition)=> {
    const { X, Y } = coordinates;

    const direction: number = activePiece.color === "white" ? +1 : -1;
    const nextRow = currentPosition[Y + direction];
    const changedSquares: ICoordinates[] = [];

    if (nextRow[X].piece === null) {
        changedSquares.push({ Y: Y + direction, X });

        if (Y + direction * 2 <= 7 && Y + direction * 2 >= 0 &&currentPosition[Y + direction * 2][X].piece === null) {
            const isItWhitePawnOnTheStartPosition = activePiece.color === "white" && Y === 1;
            const isItBlackPawnOnTheStartPosition = activePiece.color === "black" && Y === 6;

            if (isItWhitePawnOnTheStartPosition || isItBlackPawnOnTheStartPosition) {
                changedSquares.push({ Y: Y + direction * 2, X });
            }
        }
    }

    if (X - 1 >= 0 && nextRow[X - 1].piece !== null && nextRow[X - 1].piece?.color !== activePiece.color) {
        changedSquares.push({ Y: Y + direction, X: X - 1 });
    }

    if (X + 1 <= 7 && nextRow[X + 1].piece !== null && nextRow[X + 1].piece?.color !== activePiece.color) {
        changedSquares.push({ Y: Y + direction, X: X + 1 });
    }

    return changedSquares;
}

export default pawnPossibleMoves;