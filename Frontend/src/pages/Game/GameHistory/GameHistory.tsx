import { useAppSelector } from "../../../redux/hooks/hooks";
import { gameHistoryMove } from "../../../../../types";
import styles from "./GameHistory.module.css";
import MoveInfo from "./MoveInfo";

export default function GameHistory() {
    const history: gameHistoryMove[] = [...useAppSelector(state => state.game.gameHistory)].reverse();
    const blackMoves: gameHistoryMove[] = [];
    const whiteMoves: gameHistoryMove[] = [];

    history.forEach(move => {
        if (move.color === "white") {
            whiteMoves.push(move);
        } else {
            blackMoves.push(move);
        }
    });

    // console.log(history)
    return (
        <div className={styles.gameHistoryWrapper}>
            <div className={styles.gameHistory}>
                <div className={styles.numberOfMoveWrapper}>
                    {whiteMoves.map(move => <div key={move.id}>{move.id / 2 + 1}.</div>)}
                </div>
                <div className={styles.historyColumn}>
                    {whiteMoves.map(move => <MoveInfo move={move} key={move.id} />)}
                </div>
                <div className={styles.historyColumn}>
                    {whiteMoves.length > blackMoves.length ? <div className={styles.emptyMove} /> : null}
                    {blackMoves.map(move => <MoveInfo move={move} key={move.id} />)}
                </div>
            </div>
        </div>

    )
}