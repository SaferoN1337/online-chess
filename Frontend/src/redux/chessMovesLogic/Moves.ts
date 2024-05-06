import { CheckMoves, ICoordinates, IPiece, ISquare } from "../../../../types";
import { DoesOpponentHaveAnyMove, MarkAllAttackedSquares, RemoveImpossibleMoves } from "./chessMovesLogicTypes";

class Moves {
    static allMovesOfThePiece: CheckMoves = (activePiece, coordinates, currentPosition)=> {
        let allPossibleMoves: ICoordinates[] = [];
    
        if (activePiece.type === "pawn") {
            allPossibleMoves = this.pawnPossibleMoves(activePiece, coordinates, currentPosition);
        } else if (activePiece.type === "knight") {
            allPossibleMoves = this.knightPossibleMoves(activePiece, coordinates, currentPosition);
        } else if (activePiece.type === "bishop") {
            allPossibleMoves = this.bishopPossibleMoves(activePiece, coordinates, currentPosition);
        } else if (activePiece.type === "castle") {
            allPossibleMoves = this.castlePossibleMoves(activePiece, coordinates, currentPosition);
        } else if (activePiece.type === "queen") {
            allPossibleMoves = [
                ...this.bishopPossibleMoves(activePiece, coordinates, currentPosition),
                ...this.castlePossibleMoves(activePiece, coordinates, currentPosition)
            ];
        } else if (activePiece.type === "king") {
            allPossibleMoves = this.kingPossibleMoves(activePiece, coordinates, currentPosition);
        }
    
        return allPossibleMoves;
    }

    static bishopPossibleMoves: CheckMoves = (activePiece, coordinates, currentPosition) => {
        const listOfMoves: ICoordinates[] = [];
        const { X, Y } = coordinates;

        const variants = [
            { Y: -1, X: -1 },
            { Y: 1, X: 1 },
            { Y: -1, X: 1 },
            { Y: 1, X: -1 }
        ];

        variants.forEach((variant) => {
            for (let i = 1; i <= 7; i++) {
                if (X + variant.X * i < 0 || Y + variant.Y * i < 0) {
                    break;
                } else if (X + variant.X * i > 7 || Y + variant.Y * i > 7) {
                    break;
                }

                if (currentPosition[Y + variant.Y * i][X + variant.X * i].piece === null) {
                    listOfMoves.push({ X: X + variant.X * i, Y: Y + variant.Y * i });
                } else {
                    if (currentPosition[Y + variant.Y * i][X + variant.X * i].piece?.color === activePiece.color) {
                        break
                    } else {
                        listOfMoves.push({ X: X + variant.X * i, Y: Y + variant.Y * i });
                        break
                    }
                }
            }
        });

        return listOfMoves;
    }

    static castlePossibleMoves: CheckMoves = (activePiece, coordinates, currentPosition) => {
        const listOfMoves: ICoordinates[] = [];
        const { X, Y } = coordinates;

        const variants = [
            { Y: 0, X: -1 },
            { Y: 0, X: 1 },
            { Y: -1, X: 0 },
            { Y: 1, X: 0 }
        ];

        variants.forEach((variant) => {
            for (let i = 1; i <= 7; i++) {
                if (X + variant.X * i > 7 || X + variant.X * i < 0) {
                    break;
                } else if (Y + variant.Y * i > 7 || Y + variant.Y * i < 0) {
                    break;
                }

                if (currentPosition[Y + variant.Y * i][X + variant.X * i].piece === null) {
                    listOfMoves.push({ X: X + variant.X * i, Y: Y + variant.Y * i });
                } else {
                    if (currentPosition[Y + variant.Y * i][X + variant.X * i].piece?.color === activePiece.color) {
                        break;
                    } else {
                        listOfMoves.push({ X: X + variant.X * i, Y: Y + variant.Y * i });
                        break;
                    }
                }
            }
        });

        return listOfMoves;
    }

    static kingPossibleMoves: CheckMoves = (activePiece, coordinates, currentPosition) => {
        const listOfMoves: ICoordinates[] = [];
        const { X, Y } = coordinates;

        const coordinatesList = [
            { coordinateX: X - 1, coordinateY: Y },
            { coordinateX: X - 1, coordinateY: Y - 1 },
            { coordinateX: X, coordinateY: Y - 1 },
            { coordinateX: X - 1, coordinateY: Y + 1 },
            { coordinateX: X, coordinateY: Y + 1 },
            { coordinateX: X + 1, coordinateY: Y + 1 },
            { coordinateX: X + 1, coordinateY: Y },
            { coordinateX: X + 1, coordinateY: Y - 1 },
        ]

        coordinatesList.forEach(possiblePosition => {
            if (possiblePosition.coordinateX < 0 || possiblePosition.coordinateX > 7) {
                return
            }
            if (possiblePosition.coordinateY < 0 || possiblePosition.coordinateY > 7) {
                return
            }
            if (currentPosition[possiblePosition.coordinateY][possiblePosition.coordinateX].piece?.color !== activePiece.color) {
                listOfMoves.push({ X: possiblePosition.coordinateX, Y: possiblePosition.coordinateY })
            }
        });

        return listOfMoves;
    }

    static knightPossibleMoves: CheckMoves = (activePiece, coordinates, currentPosition) => {
        const listOfMoves: ICoordinates[] = [];
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
                return;
            }
            if (possiblePosition.coordinateY < 0 || possiblePosition.coordinateY > 7) {
                return;
            }
            if (currentPosition[possiblePosition.coordinateY][possiblePosition.coordinateX].piece?.color !== activePiece.color) {
                listOfMoves.push({ X: possiblePosition.coordinateX, Y: possiblePosition.coordinateY })
            }
        });

        return listOfMoves;
    }

    static pawnPossibleMoves: CheckMoves = (activePiece, coordinates, currentPosition) => {
        const { X, Y } = coordinates;

        const direction: number = activePiece.color === "white" ? +1 : -1;
        const nextRow = currentPosition[Y + direction];
        const listOfMoves: ICoordinates[] = [];

        if (nextRow[X].piece === null) {
            listOfMoves.push({ Y: Y + direction, X });

            if (Y + direction * 2 <= 7 && Y + direction * 2 >= 0 && currentPosition[Y + direction * 2][X].piece === null) {
                const isItWhitePawnOnTheStartPosition = activePiece.color === "white" && Y === 1;
                const isItBlackPawnOnTheStartPosition = activePiece.color === "black" && Y === 6;

                if (isItWhitePawnOnTheStartPosition || isItBlackPawnOnTheStartPosition) {
                    listOfMoves.push({ Y: Y + direction * 2, X });
                }
            }
        }

        if (X - 1 >= 0 && nextRow[X - 1].piece !== null && nextRow[X - 1].piece?.color !== activePiece.color) {
            listOfMoves.push({ Y: Y + direction, X: X - 1 });
        }

        if (X + 1 <= 7 && nextRow[X + 1].piece !== null && nextRow[X + 1].piece?.color !== activePiece.color) {
            listOfMoves.push({ Y: Y + direction, X: X + 1 });
        }

        return listOfMoves;
    }

    static markAllAttackedSquares: MarkAllAttackedSquares = (position, playerColor) => {
        const listOfSquaresWithOpponentPiece: ISquare[] = position.flat(2).filter(square => square.piece !== null && square.piece.color !== playerColor);
    
        listOfSquaresWithOpponentPiece.forEach(square => {
            const opponentPiece: IPiece = { ...square.piece } as IPiece;
            let movesOfOpponentPiece: ICoordinates[] = [];
    
            if (opponentPiece.type === "pawn") {
                const direction: number = opponentPiece.color === "white" ? 1 : -1;
                if (square.X - 1 >= 0) {
                    movesOfOpponentPiece.push({ X: square.X - 1, Y: square.Y + direction });
                }
                if (square.X + 1 <= 7) {
                    movesOfOpponentPiece.push({ X: square.X + 1, Y: square.Y + direction });
                }
            } else {
                movesOfOpponentPiece = this.allMovesOfThePiece(opponentPiece, { X: square.X, Y: square.Y }, position);
            }
            
            movesOfOpponentPiece.forEach(move => {
                if (move.X >= 0 && move.X <= 7 && move.Y >= 0 && move.Y <= 7) {
                    position[move.Y][move.X].attacked = true;
                }
            });
        });
    }

    static removeImpossibleMoves: RemoveImpossibleMoves = (listOfMoves, piece, pieceCoordinates, currentPosition) => {
        const possibleMoves: ICoordinates[] = [];
    
        listOfMoves.forEach(({ X, Y }) => {
            const potentialPosition: ISquare[][] = [...currentPosition].map(line => [...line].map(square => { return { ...square } }));
            potentialPosition[pieceCoordinates.Y][pieceCoordinates.X].piece = null;
            potentialPosition[Y][X].piece = { ...piece };
    
            this.markAllAttackedSquares(potentialPosition, piece.color);
    
            const kingsPosition: ISquare = [...potentialPosition].flat(2).find(s => s.piece?.color === piece.color && s.piece.type === "king") as ISquare;
            if (kingsPosition.attacked === false) {
                possibleMoves.push({ X, Y });
            }
        });
    
        return possibleMoves;
    }

    static doesOpponentHaveAnyMove: DoesOpponentHaveAnyMove = (position, playerColor) => {
        const currenPosition: ISquare[][] = [...position].map(line => [...line].map(square => { return { ...square } }));
        const listOfPiece: ISquare[] = currenPosition.flat(2).filter(square => square.piece !== null && square.piece.color === playerColor);
    
        for (let i = 0; i < listOfPiece.length; i++) {
            const square: ISquare = listOfPiece[i];
            const coordinates: ICoordinates = { X: square.X, Y: square.Y }
    
            let listOfMoves = this.allMovesOfThePiece(square.piece as IPiece, coordinates, position);
    
            listOfMoves = this.removeImpossibleMoves(listOfMoves, square.piece as IPiece, coordinates, position);
            if (listOfMoves.length !== 0) {
                return null;
            }
        }
    
        this.markAllAttackedSquares(currenPosition, playerColor);
        
        const kingsPosition: ISquare = currenPosition.flat(2).find(square => square.piece?.color === playerColor && square.piece.type === "king") as ISquare;
        if (kingsPosition.attacked === true) {
            const winnerColor = playerColor === "white" ? "black" : "white";
            return { description: `${winnerColor === "white" ? "Белые" : "Черные"} победили ("Мат")`, winner: winnerColor };
        }
        return { description: `Ничья ("Пат")`, winner: 'draw' };
    }
}

export default Moves;