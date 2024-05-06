import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../../redux/hooks/hooks";
import styles from "./Timer.module.css";
import { updateGameResult, updateTimer } from "../../../redux/slices/gameSlice";
import useTimer from "./useTimer";

export default function Timer() {
    const timers = useAppSelector(state => state.game.timers);
    const moveColor = useAppSelector(state => state.game.moveColor);
    const gameResult = useAppSelector(state=> state.game.gameResult)
    const dispatch = useAppDispatch();

    useEffect(() => {
        if (!moveColor) return;
        const timer = setInterval(() => {
            const timeData = { ...timers };
            const currentTime = Date.now();

            if (moveColor === "black") {
                if (timeData.blackTimeLeft <= 0) {
                    clearInterval(timer);
                    dispatch(updateGameResult({ description: `Белые победили по времени`, winner: "white" }));
                }

                timeData.blackTimeLeft = timeData.blackTimeLeft - (currentTime - timeData.timeOfThelastMove) / 1000;
                timeData.timeOfThelastMove = currentTime;
            } else {
                if (timeData.whiteTimeLeft <= 0) {
                    clearInterval(timer);
                    dispatch(updateGameResult({ description: `Чёрные победили по времени`, winner: "black" }));
                }

                timeData.whiteTimeLeft = timeData.whiteTimeLeft - (currentTime - timeData.timeOfThelastMove) / 1000;
                timeData.timeOfThelastMove = currentTime;
            }
            dispatch(updateTimer(timeData));
        }, 100);

        if(gameResult) {
            clearInterval(timer);
        }
        return () => {
            clearInterval(timer);
        }
    }, [moveColor, timers]);

    return (
        <div className={styles.timerWrapper}>
            <div className={styles.whiteTimer}>
                <p>{useTimer(timers.whiteTimeLeft)}</p>
            </div>
            <div className={styles.blackTimer}>
                <p>{useTimer(timers.blackTimeLeft)}</p>
            </div>
        </div>
    )
}