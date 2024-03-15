import { useLocation } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../../../redux/hooks/hooks";
import { runAnimationAndSaveHistory, showPromotionBlock } from "../../../../redux/slices/gameSlice";
import { socket } from "../../../../skocketIo";
import { ISquare, MoveData } from "../../../../../../types";
import styles from "../ChessBoard.module.css";
import Pieces from "../Pieces/Pieces";

interface IProps {
    color: "white" | "black",
    square: ISquare,
}

export default function Square({ color, square }: IProps) {
    const dispatch = useAppDispatch();
    const activePiece = useAppSelector(state => state.game.activePiece);
    const activePiecePosition = useAppSelector(state => state.game.activePiecePosition);
    const roomId = useLocation().pathname.replace("/game/", "");
    function move() {
        console.log(square.X, square.Y)

        if (activePiece && activePiecePosition && square.possibleMove) {
            console.log(square.possibleMove)
            const moveData: MoveData = {
                startSquare: { X: activePiecePosition.X, Y: activePiecePosition.Y },
                endSquare: { X: square.X, Y: square.Y },
                piece: activePiece,
                roomId: +roomId
            }

            if(square.Y === 7 && activePiece.type === "pawn" && activePiece.color === "white") {
                dispatch(showPromotionBlock(moveData));
            } else if(square.Y=== 0 && activePiece.type === "pawn" && activePiece.color === "black") { 
                dispatch(showPromotionBlock(moveData));
            }else {
                dispatch(runAnimationAndSaveHistory(moveData));
                socket.emit("movePiece", moveData);
            }
        }
    }

    return (
        <div
            className={`${styles.square} ${color === "white" ? styles.white : styles.black}`}
            onClick={move}
            style={square.possibleMove && square.piece && !square.attacked  ? { backgroundColor: "greenyellow" } : {}}
        >
            {square.possibleMove && !square.piece && !square.attacked 
                ?
                <div className={styles.greenDot} >
                    <div />
                </div>
                :
                null
            }
            {square.piece ? <Pieces
                piece={square.piece}
                X={square.X}
                Y={square.Y}
            /> : null}
        </div>
    )
}