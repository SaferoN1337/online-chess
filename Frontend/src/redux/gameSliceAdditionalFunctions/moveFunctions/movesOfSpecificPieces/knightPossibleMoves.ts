import { CheckMoves, ICoordinates } from "../../../../../../types";

const knightPossibleMoves: CheckMoves = (activePiece, coordinates, currentPosition) => {
    const changedSquares: ICoordinates[] = [];
    const { X, Y } = coordinates;

    const coordinatesList = [
        { coordinateX: X - 1, coordinateY: Y - 2 },
        { coordinateX: X - 2, coordinateY: Y - 1 },
        { coordinateX: X + 1, coordinateY: Y - 2 },
        { coordinateX: X + 2, coordinateY: Y - 1 },
        { coordinateX: X - 2, coordinateY: Y + 1 },
        { coordinateX: X - 1, coordinateY: Y + 2 },
        { coordinateX: X + 2, coordinateY: Y + 1 },
        { coordinateX: X + 1, coordinateY: Y + 2 },
    ]

    coordinatesList.forEach(possiblePosition => {
        if (possiblePosition.coordinateX < 0 || possiblePosition.coordinateX > 7) {
            return
        }
        if (possiblePosition.coordinateY < 0 || possiblePosition.coordinateY > 7) {
            return
        }
        if (currentPosition[possiblePosition.coordinateY][possiblePosition.coordinateX].piece?.color !== activePiece.color) {
            changedSquares.push({ X: possiblePosition.coordinateX, Y: possiblePosition.coordinateY })
        }
    });

    return changedSquares;
}

export default knightPossibleMoves;