import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../redux/hooks/hooks";
import { setPlayerColor } from "../../redux/slices/usersSlice";
import ChessBoard from "./ChessBoard/ChessBoard";
import styles from "./GamePage.module.css";
import GameHistory from "./GameHistory/GameHistory";
import { socket } from "../../skocketIo";
import { useLocation } from "react-router-dom";
import Timer from "./Timer/Timer";
import GameResult from "./GameResult/GameResult";
import { updateGameData } from "../../redux/slices/gameSlice";
import { GameHistoryMove, IGameData, Loading } from "../../../../types";
import Spinner from "../../components/Spinner/Spinner";
import { POSTApiRequest } from "../../apiRequest";

export default function GamePage() {
    const dispatch = useAppDispatch();
    const location = useLocation();
    const listOfGames = useAppSelector(state=> state.components.listOfGames);
    const roomId = location.pathname.replace("/game/", "");
    const currentGameData = listOfGames.find(game=> game.id === +roomId);
    const [loading, setLoading] = useState<Loading>("loading");

    console.log(listOfGames)
    useEffect(() => {
        socket.emit("enterTheRoom", { roomId: roomId }, (response: { result: boolean }) => {
            console.log(`user connected to the room ${roomId} with result ${response.result}`);
        });

        return ()=> {
            socket.emit("userLeftTheRoom",  { roomId: roomId });
        }
    }, []);

    useEffect(()=> {
        if(currentGameData) {
            dispatch(updateGameData(currentGameData));
        }

        requestGameData();
    }, []);

    async function requestGameData() {
        setLoading("loading");
        const response = await POSTApiRequest<{ id: number }, { gameData: IGameData, gameHistory: GameHistoryMove[] }>("/request-game-data", { id: +roomId });
        if(response.result === "success") {
            dispatch(updateGameData(response.data.gameData));
        }
        setLoading("fulfilled");
    }

    return (
        <>
            <GameResult />
            <div className={styles.content}>
                <div className={styles.mainBlock}>
                    <div className={styles.chessBoardWrapper}>
                        {!currentGameData ? <Spinner /> : <ChessBoard />}
                    </div>
                </div>
                <Timer />
                <GameHistory />
                <button onClick={() => dispatch(setPlayerColor({ color: "white" }))}>white</button>
                <button onClick={() => dispatch(setPlayerColor({ color: "black" }))}>black</button>
            </div>
        </>
    )
}