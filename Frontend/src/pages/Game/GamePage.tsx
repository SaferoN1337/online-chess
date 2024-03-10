import { useAppDispatch } from "../../redux/hooks/hooks";
import { setPlayerColor } from "../../redux/slices/usersSlice";
import ChessBoard from "./ChessBoard/ChessBoard";
import styles from "./Game.module.css";
import GameHistory from "./GameHistory/GameHistory";

export default function Game() {
    const dispatch = useAppDispatch();

    return (
        <div className={styles.content}>
            <div className={styles.mainBlock}>
                <div className={styles.chessBoardWrapper}>
                    <ChessBoard />
                </div>
            </div>

            <GameHistory />
            <button onClick={() => dispatch(setPlayerColor({ color: "white" }))}>white</button>
            <button onClick={() => dispatch(setPlayerColor({ color: "black" }))}>black</button>
        </div>
    )
}