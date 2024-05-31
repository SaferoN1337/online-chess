import { MoveData } from "../../../../../../types";
import AdditionalFunctions from "../../../../redux/chessMovesLogic/AdditionalFunctions";
import { useAppDispatch, useAppSelector } from "../../../../redux/hooks/hooks";
import { runPieceMoveAnimation } from "../../../../redux/slices/gameSlice";
import { socket } from "../../../../skocketIo";
import styles from "./Promotion.module.css";

export default function Promotion({ moveData }: { moveData: MoveData }) {
    const dispatch = useAppDispatch();
    const position = useAppSelector(state=> state.game.currentPosition);
    const gameHistory = useAppSelector(state=> state.game.gameHistory);
    const top = `${moveData.piece.color === "black" ? 87.5 : 0}%`;
    let left = "0";
    if (moveData.startSquare.X >= 4) {
        left = "50%";
    } 

    function onClick(type: "queen" | "castle" | "bishop" | "knight") {
        const lastMove = gameHistory[gameHistory.length - 1];
        const newMoveData: MoveData = { ...moveData, piece: { color: moveData.piece.color, type: type } };
        const gameHistoryMove = AdditionalFunctions.createGameHistoryMove(position, moveData.piece, moveData.startSquare,moveData.endSquare, lastMove);

        dispatch(runPieceMoveAnimation({ moveData: newMoveData, gameHistoryMove }));
        socket.emit("movePiece", { moveData: newMoveData, gameHistoryMove});
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