import { CheckMoves, ICoordinates } from "../../types";

const checkBishopPossibleMoves: CheckMoves = (activePiece, coordinates, currentPosition) => {
    const changedSquares: ICoordinates[] = [];
    const { X, Y } = coordinates;

    for (let i = 1; i <= 7; i++) {
        if (X - i < 0 || Y - i < 0) {
            break;
        }

        if (currentPosition[Y - i][X - i].piece === null) {
            changedSquares.push({ X: X - i, Y: Y - i });
        } else {
            if (currentPosition[Y - i][X - i].piece?.color === activePiece.color) {
                break
            } else {
                changedSquares.push({ X: X - i, Y: Y - i });
                break
            }
        }
    }

    for (let i = 1; i <= 7; i++) {
        if (X + i > 7 || Y + i > 7) {
            break;
        }

        if (currentPosition[Y + i][X + i].piece === null) {
            changedSquares.push({ X: X + i, Y: Y + i });
        } else {
            if (currentPosition[Y + i][X + i].piece?.color === activePiece.color) {
                break
            } else {
                changedSquares.push({ X: X + i, Y: Y + i });
                break
            }
        }
    }

    for (let i = 1; i <= 7; i++) {
        if (X - i < 0 || Y + i > 7) {
            break;
        }

        if (currentPosition[Y + i][X - i].piece === null) {
            changedSquares.push({ X: X - i, Y: Y + i });
        } else {
            if (currentPosition[Y + i][X - i].piece?.color === activePiece.color) {
                break
            } else {
                changedSquares.push({ X: X - i, Y: Y + i });
                break
            }
        }
    }

    for (let i = 1; i <= 7; i++) {
        if (X + i > 7 || Y - i < 0) {
            break;
        }

        if (currentPosition[Y - i][X + i].piece === null) {
            changedSquares.push({ X: X + i, Y: Y - i });
        } else {
            if (currentPosition[Y - i][X + i].piece?.color === activePiece.color) {
                break
            } else {
                changedSquares.push({ X: X + i, Y: Y - i });
                break
            }
        }
    }

    return changedSquares;
}

export default checkBishopPossibleMoves;