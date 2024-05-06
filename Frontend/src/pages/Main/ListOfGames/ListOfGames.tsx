import styles from "./ListOfGames.module.css";
import { useEffect, useState } from "react";
import { POSTApiRequest } from "../../../apiRequest";
import ChessBoardPreview from "./ChessBoardPreview/ChessBoardPreview";
import Spinner from "../../../components/Spinner/Spinner";
import { useAppDispatch, useAppSelector } from "../../../redux/hooks/hooks";
import { setListOfGames } from "../../../redux/slices/componentSlice";
import AdditionalFunctions from "../../../redux/chessMovesLogic/AdditionalFunctions";
import { IGameData, Loading } from "../../../../../types";
import { Link } from "react-router-dom";


export default function ListOfGames() {
    const dispatch = useAppDispatch();
    const listOfGames = useAppSelector(state=> state.components.listOfGames);
    const [windowSize, setWindowSize] = useState<number>(window.innerWidth);
    const [loading, setLoading] = useState<Loading>("loading");

    let cardsInLine = 1;
    if (windowSize > 1216) {
        cardsInLine = 5;
    } else if (windowSize > 976 && windowSize <= 1216) {
        cardsInLine = 4;
    } else if (windowSize > 736 && windowSize <= 976) {
        cardsInLine = 3;
    } else if (windowSize > 496 && windowSize <= 736) {
        cardsInLine = 2;
    }

    const needCards = cardsInLine - listOfGames.length % cardsInLine;
    const invisibleCard: number[] = new Array(needCards).fill(0).map((_, index) => index);

    useEffect(() => {
        function onResize() {
            setWindowSize(window.innerWidth);
        }
        window.addEventListener("resize", onResize);

        return () => {
            window.removeEventListener("resize", onResize);
        }
    }, []);

    useEffect(() => {
        // requestListOfGames();
        setTimeout(()=> { 
            setLoading("fulfilled");
            requestListOfGames();
        }, 1000);
    }, []);

    async function requestListOfGames() {
        // await POSTApiRequest("/request-list-of-games", { parameters: {} });
        const list: IGameData[] = [
            { id: 1, position: AdditionalFunctions.renderDefaultPosition(), player1: "SaferoN123", player2: "Sanya", timers: { blackTimeLeft: 300, whiteTimeLeft: 300, timeOfThelastMove: Date.now(), }, result: null },
            { id: 2, position: AdditionalFunctions.renderDefaultPosition(), player1: "Alexander", player2: "SaferoN1337", timers: { blackTimeLeft: 600, whiteTimeLeft: 600, timeOfThelastMove: Date.now() }, result: null },
            { id: 3, position: AdditionalFunctions.renderDefaultPosition(), player1: "Ivan2009", player2: "Alex7902", timers: { blackTimeLeft: 500, whiteTimeLeft: 500, timeOfThelastMove: Date.now() }, result: null },
            { id: 4, position: AdditionalFunctions.renderDefaultPosition(), player1: "Какой-то рандом", player2: "431245904862981", timers: { blackTimeLeft: 200, whiteTimeLeft: 200, timeOfThelastMove: Date.now() }, result: null },
            { id: 5, position: AdditionalFunctions.renderDefaultPosition(), player1: "Renamed_User2132414", player2: "39633535904981", timers: { blackTimeLeft: 60, whiteTimeLeft: 0, timeOfThelastMove: Date.now() }, result: { description: `Чёрные победили по времени`, winner: "black" } }
        ]
        dispatch(setListOfGames(list));
    }

    return (
        <div className={styles.listOfGamesWrapper}>
            {loading === "loading" ? <Spinner /> :
                <div className={styles.listOfGames}>
                    {listOfGames.map((game) =>
                        <Link className={styles.gamePreviewWrapper} to={"/game/" + game.id} key={game.id}>
                            <ChessBoardPreview position={game.position} />
                            <p>{game.player1} VS {game.player2}</p>
                        </Link>
                    )}
                    {invisibleCard.map((elem) => <div className={styles.invisibleCard} key={elem} />)}
                </div>
            }
        </div>
    )
}