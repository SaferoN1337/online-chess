import { ReactNode } from "react";
import { gameHistoryMove } from "../../../../../types";
import styles from "./GameHistory.module.css";

export default function MoveInfo({ move }: { move: gameHistoryMove }) {
    const letters: string[] = ["A", "B", "C", "D", "E", "F", "G", "H"];
    let text: ReactNode = <>
        {`${letters[move.startSquare.X]}${move.startSquare.Y + 1} - `}
        {move.killedPiece ? <span>x</span> : ""}
        {`${letters[move.endSquare.X]}${move.endSquare.Y + 1}`}
    </>

    if (move.type === "king" && move.startSquare.X === 4 && (move.startSquare.Y === 0 || move.startSquare.Y === 7)) {
        if (move.endSquare.Y === move.startSquare.Y && move.endSquare.X === 2) {
            text = "О-О-О";
        } else if(move.endSquare.Y === move.startSquare.Y && move.endSquare.X === 6) {
            text = "О-О";
        }
    }
    
    return (
        <div className={styles.moveInfoWrapper}>
            <img
                className={styles.moveImg}
                src={`/pieces/${move.color}-${move.type}.png`}
                alt={`${move.color} ${move.type}`}
            />
            <p className={styles.moveCoordinates}>
                {text}
                {move.check ? <span>+</span> : ""}
            </p>
        </div>
    )
}