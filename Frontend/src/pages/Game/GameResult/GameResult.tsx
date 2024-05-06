import styles from "./GemeResult.module.css";
import Overlay from "../../../components/Overlay/Overlay";
import { useAppDispatch, useAppSelector } from "../../../redux/hooks/hooks";
import { setShowGameResult } from "../../../redux/slices/componentSlice";
import { useEffect } from "react";
import { updateActivePiece } from "../../../redux/slices/gameSlice";
import { Link } from "react-router-dom";

export default function GameResult() {
    const showGameResult = useAppSelector(state => state.components.showGameResult);
    const gameResult = useAppSelector(state => state.game.gameResult);
    const playerColor = useAppSelector(state => state.users.playerColor);
    const dispatch = useAppDispatch();
    
    useEffect(() => {
        if (!gameResult) { 
            dispatch(setShowGameResult(false));
            return;
        }
        dispatch(updateActivePiece(null));
        dispatch(setShowGameResult(true))
        console.log("result", gameResult.description);
    }, [gameResult]);

    return (
        <Overlay showOverlay={showGameResult} setShowOverlay={setShowGameResult}>
            <div className={styles.contentWrapper}>
                <div className={styles.content}>
                    <h2>Игра завершена!</h2>
                    {gameResult?.winner === playerColor
                        ?
                        <p className={styles.congratulation}>Вы победили!</p>
                        :
                        <p className={styles.congratulation}>Вы проиграли!</p>
                    }
                    <p>{gameResult?.description}</p>
                    <button className={styles.rematchButton}>Реванш</button>
                    <Link to={"/"}>
                        <button className={styles.rematchButton}>Вернуться на главную</button>
                    </Link>
                </div>
            </div>
        </Overlay>
    )
}