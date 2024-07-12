import styles from "./ListOfGames.module.css";
import { useEffect, useState } from "react";
// import { POSTApiRequest } from "../../../apiRequest";

import Spinner from "../../../components/Spinner/Spinner";
import { useAppDispatch, useAppSelector } from "../../../redux/hooks/hooks";
import { setListOfGames } from "../../../redux/slices/componentSlice";
import AdditionalFunctions from "../../../redux/chessMovesLogic/AdditionalFunctions";
import { IGameData, Loading } from "../../../../../types";
import GameCard from "./GameCard/GameCard";


export default function ListOfGames() {
    const dispatch = useAppDispatch();
    const listOfGames = useAppSelector(state => state.components.listOfGames);
    const [loading, setLoading] = useState<Loading>("loading");

    useEffect(() => {
        // requestListOfGames();
        const loadingTimer = setTimeout(() => {
            setLoading("fulfilled");
            requestListOfGames();
        }, 1000);

        return () => {
            clearTimeout(loadingTimer)
        }
    }, []);

    useEffect(() => {
        if (loading === "loading") return;
        const gameTimeInterval = setInterval(() => {
            const gamesWithUpdatedTimers: IGameData[] = listOfGames.map(game => {
                const newGameData: IGameData = { ...game, timers: { ...game.timers } };
                const currentTime = Date.now();
                if (game.moveColor === "white") {
                    newGameData.timers.whiteTimeLeft = game.timers.whiteTimeLeft - (currentTime - game.timers.timeOfThelastMove) / 1000;
                } else {
                    newGameData.timers.blackTimeLeft = game.timers.blackTimeLeft - (currentTime - game.timers.timeOfThelastMove) / 1000;
                }
                newGameData.timers.timeOfThelastMove = currentTime;
                return newGameData;
            });

            dispatch(setListOfGames(gamesWithUpdatedTimers));
        }, 1000);
        return () => {
            console.log("clear")
            clearInterval(gameTimeInterval)
        }
    }, [listOfGames, loading]);

    async function requestListOfGames() {
        // await POSTApiRequest("/request-list-of-games", { parameters: {} });
        const list: IGameData[] = [
            { id: 1, position: AdditionalFunctions.renderDefaultPosition(), player1: "SaferoN123", player2: "Sanya", timers: { blackTimeLeft: 300, whiteTimeLeft: 300, timeOfThelastMove: Date.now(), }, result: null, moveColor: "white" },
            { id: 2, position: AdditionalFunctions.renderDefaultPosition(), player1: "Alexander", player2: "SaferoN1337", timers: { blackTimeLeft: 600, whiteTimeLeft: 600, timeOfThelastMove: Date.now() }, result: null, moveColor: "black" },
            { id: 3, position: AdditionalFunctions.renderDefaultPosition(), player1: "Ivan2009", player2: "Alex7902", timers: { blackTimeLeft: 500, whiteTimeLeft: 500, timeOfThelastMove: Date.now() }, result: null, moveColor: "black" },
            { id: 4, position: AdditionalFunctions.renderDefaultPosition(), player1: "Какой-то рандом", player2: "431245904862981", timers: { blackTimeLeft: 200, whiteTimeLeft: 200, timeOfThelastMove: Date.now() }, result: null, moveColor: "white" },
            { id: 5, position: AdditionalFunctions.renderDefaultPosition(), player1: "Renamed_User2132414", player2: "39633535904981", timers: { blackTimeLeft: 60, whiteTimeLeft: 0, timeOfThelastMove: Date.now() }, result: { description: `Чёрные победили по времени`, winner: "black" }, moveColor: "white" }
        ]
        dispatch(setListOfGames(list));
    }

    return (
        <div className={styles.listOfGamesWrapper}>
            {loading === "loading" && listOfGames.length === 0 ? <Spinner /> :
                <div className={styles.listOfGames}>
                    {listOfGames.map((game) => <GameCard game={game} key={game.id} />)}
                </div>
            }
        </div>
    )
}