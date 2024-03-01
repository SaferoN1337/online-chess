import { CheckMoves, ICoordinates } from "../../types";

const checkCastlePossibleMoves: CheckMoves = (activePiece, coordinates, currentPosition) => {
    const changedSquares: ICoordinates[] = [];
    const { X, Y } = coordinates;

    for (let i = 1; i <= 7; i++) {
        if (X + i > 7) {
            break;
        }

        if (currentPosition[Y][X + i].piece === null) {
            changedSquares.push({ X: X + i, Y: Y });
        } else {
            if (currentPosition[Y][X + i].piece?.color === activePiece.color) {
                break;
            } else {
                changedSquares.push({ X: X + i, Y: Y });
                break;
            }
        }
    }

    for (let i = 1; i <= 7; i++) {
        if (Y + i > 7) {
            break;
        }

        if (currentPosition[Y + i][X].piece === null) {
            changedSquares.push({ X: X, Y: Y + i });
        } else {
            if (currentPosition[Y + i][X].piece?.color === activePiece.color) {
                break;
            } else {
                changedSquares.push({ X: X, Y: Y + i });
                break;
            }
        }
    }

    for (let i = 1; i <= 7; i++) {
        if (X - i < 0) {
            break;
        }

        if (currentPosition[Y][X - i].piece === null) {
            changedSquares.push({ X: X - i, Y: Y });
        } else {
            if (currentPosition[Y][X - i].piece?.color === activePiece.color) {
                break;
            } else {
                changedSquares.push({ X: X - i, Y: Y });
                break;
            }
        }
    }

    for (let i = 1; i <= 7; i++) {
        if (Y - i < 0) {
            break;
        }

        if (currentPosition[Y - i][X].piece === null) {
            changedSquares.push({ X: X, Y: Y - i });
        } else {
            if (currentPosition[Y - i][X].piece?.color === activePiece.color) {
                break;
            } else {
                changedSquares.push({ X: X, Y: Y - i });
                break;
            }
        }
    }
    
    return changedSquares;
}

export default checkCastlePossibleMoves;