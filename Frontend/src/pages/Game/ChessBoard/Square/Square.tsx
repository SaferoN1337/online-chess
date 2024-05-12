import styles from "../ChessBoard.module.css";
import { useLocation } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../../../redux/hooks/hooks";
import { runCastlingAnimation, runPieceMoveAnimation, showPromotionBlock } from "../../../../redux/slices/gameSlice";
import { socket } from "../../../../skocketIo";
import Pieces from "../Pieces/Pieces";
import { ISquare, MoveData } from "../../../../../../types";
import AdditionalFunctions from "../../../../redux/chessMovesLogic/AdditionalFunctions";

interface IProps {
    color: "white" | "black",
    square: ISquare,
}

export default function Square({ color, square }: IProps) {
    const dispatch = useAppDispatch();
    const activePiece = useAppSelector(state => state.game.activePiece);
    const activePiecePosition = useAppSelector(state => state.game.activePiecePosition);
    const roomId = useLocation().pathname.replace("/game/", "");
    const timers = useAppSelector(state => state.game.timers);
    const gameResult = useAppSelector(state => state.game.gameResult);
    const position = useAppSelector(state=> state.game.currentPosition);
    const gameHistory = useAppSelector(state=> state.game.gameHistory);

    function move() {
        if (gameResult) return;

        console.log(square.X, square.Y)
        if (activePiece && activePiecePosition && square.possibleMove) {
            const moveData: MoveData = {
                startSquare: { X: activePiecePosition.X, Y: activePiecePosition.Y },
                endSquare: { X: square.X, Y: square.Y },
                piece: activePiece,
                roomId: +roomId,
                timers: { ...timers, timeOfThelastMove: Date.now() }
            }
            const lastMove = gameHistory[gameHistory.length - 1];
            const gameHistoryMove = AdditionalFunctions.createGameHistoryMove(position, moveData.piece, moveData.startSquare,moveData.endSquare, lastMove);
            if (square.Y === 7 && activePiece.type === "pawn" && activePiece.color === "white") {
                dispatch(showPromotionBlock(moveData));
            } else if (square.Y === 0 && activePiece.type === "pawn" && activePiece.color === "black") {
                dispatch(showPromotionBlock(moveData));
            } else if (activePiece.type === "king"
                && (square.Y === 0 || square.Y === 7)
                && (square.X === 2 || square.X === 6)
                && (activePiecePosition.X === 4)
                && (activePiecePosition.Y === 0 || activePiecePosition.Y === 7)
            ) {
                dispatch(runCastlingAnimation({ moveData, gameHistoryMove }));
                socket.emit("castling", { moveData, gameHistoryMove});
            } else {
                dispatch(runPieceMoveAnimation({ moveData, gameHistoryMove}));
                socket.emit("movePiece", { moveData, gameHistoryMove}, ({ result }: { result: boolean }) => {
                    if(result === false) {

                    }
                });
            }
        }
    }

    return (
        <div
            className={`${styles.square} ${color === "white" ? styles.white : styles.black}`}
            onClick={move}
            style={square.possibleMove && square.piece && !square.attacked ? { backgroundColor: "greenyellow" } : {}}
        >
            {square.possibleMove && !square.piece && !square.attacked
                ?
                <div className={styles.greenDot} >
                    <div />
                </div>
                :
                null
            }
            {!square.piece ? null :
                <Pieces
                    piece={square.piece}
                    X={square.X}
                    Y={square.Y}
                />
            }
        </div>
    )
}