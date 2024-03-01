import ChessBoard from "./ChessBoard/ChessBoard";
import styles from "./Game.module.css";

export default function Game() {
    return (
        <div className={styles.content}>
            <ChessBoard />
        </div>
    )
}