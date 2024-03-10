import { gameHistoryMove } from "../../../types";
import styles from "./GameHistory.module.css";

export default function MoveInfo({ move }: { move: gameHistoryMove }) {
    const letters: string[] = ["A", "B", "C", "D", "E", "F", "G", "H"];
    
    return (
        <div className={styles.moveInfoWrapper}>
            <img
                className={styles.moveImg}
                src={`/pieces/${move.color}-${move.type}.png`}
                alt={`${move.color} ${move.type}`}
            />
            <p className={styles.moveCoordinates}>
                {`${letters[move.startSquare.X]}${move.startSquare.Y + 1} - `}
                {move.killedPiece ? <span>x</span> : ""}
                {`${letters[move.endSquare.X]}${move.endSquare.Y + 1}`}
                {move.check ? <span>+</span> : ""}
            </p>
        </div>
    )
}