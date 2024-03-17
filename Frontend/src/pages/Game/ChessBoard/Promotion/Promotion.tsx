import { MoveData } from "../../../../../../types";
import { useAppDispatch } from "../../../../redux/hooks/hooks";
import { runPieceMoveAnimation } from "../../../../redux/slices/gameSlice";
import { socket } from "../../../../skocketIo";
import styles from "./Promotion.module.css";

export default function Promotion({ moveData }: { moveData: MoveData }) {
    const dispatch = useAppDispatch();
    const top = `${moveData.piece.color === "black" ? 87.5 : 0}%`;
    let left = "0";
    if (moveData.startSquare.X >= 4) {
        left = "50%";
    } 

    function onClick(type: "queen" | "castle" | "bishop" | "knight") {
        const newMoveData: MoveData = { ...moveData, piece: { color: moveData.piece.color, type: type } };
        dispatch(runPieceMoveAnimation(newMoveData));
        socket.emit("movePiece", newMoveData);
    }

    return (
        <div
            className={`${styles.promotionBlock} ${moveData.piece.color === "black" ? styles.rotate : ""}`}
            style={{ top: top, left: left }}
        >
            <div className={styles.pieceImgWrapper} onClick={() => onClick("queen")} >
                <img src={`/pieces/${moveData.piece.color}-queen.png`} alt="queen" />
            </div>
            <div className={styles.pieceImgWrapper} onClick={() => onClick("castle")} >
                <img src={`/pieces/${moveData.piece.color}-castle.png`} alt="castle" />
            </div>
            <div className={styles.pieceImgWrapper} onClick={() => onClick("bishop")} >
                <img src={`/pieces/${moveData.piece.color}-bishop.png`} alt="bishop" />
            </div>
            <div className={styles.pieceImgWrapper} onClick={() => onClick("knight")} >
                <img src={`/pieces/${moveData.piece.color}-knight.png`} alt="knight" />
            </div>
        </div>
    )
}