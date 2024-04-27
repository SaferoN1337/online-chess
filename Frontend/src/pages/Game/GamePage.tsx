import { useEffect } from "react";
import { useAppDispatch } from "../../redux/hooks/hooks";
import { setPlayerColor } from "../../redux/slices/usersSlice";
import ChessBoard from "./ChessBoard/ChessBoard";
import styles from "./GamePage.module.css";
import GameHistory from "./GameHistory/GameHistory";
import { socket } from "../../skocketIo";
import { useLocation } from "react-router-dom";
import Timer from "./Timer/Timer";

export default function GamePage() {
    const dispatch = useAppDispatch();
    const location = useLocation();

    useEffect(() => {
        const roomId = location.pathname.replace("/game/", "");
        socket.emit("enterTheRoom", { roomId: roomId }, (response: { result: boolean }) => {
            console.log(`user connected to the room ${roomId} with result ${response.result}`);
        });
    }, []);


    return (
        <div className={styles.content}>
            <div className={styles.mainBlock}>
                <div className={styles.chessBoardWrapper}>
                    <ChessBoard />
                </div>
            </div>
            <Timer />
            <GameHistory />
            <button onClick={() => dispatch(setPlayerColor({ color: "white" }))}>white</button>
            <button onClick={() => dispatch(setPlayerColor({ color: "black" }))}>black</button>
        </div>
    )
}