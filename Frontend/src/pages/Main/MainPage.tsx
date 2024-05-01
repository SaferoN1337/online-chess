import styles from "./MainPage.module.css";
import { useEffect, useState } from "react"
import { POSTApiRequest } from "../../apiRequest";
import { ISquare } from "../../../../types";
import AdditionalFunctions from "../../redux/chessMovesLogic/AdditionalFunctions";
import ChessBoardPreview from "./ChessBoardPreview/ChessBoardPreview";

interface GameData {
    id: number,
    position: ISquare[][],
    player1: string,
    player2: string,
}
export default function MainPage() {
    const [listOfGames, setListOfGames] = useState<GameData[]>([
        { id: 1, position: AdditionalFunctions.renderDefaultPosition(), player1: "SaferoN123", player2: "Sanya" },
        { id: 2, position: AdditionalFunctions.renderDefaultPosition(), player1: "Alexander", player2: "SaferoN1337" },
        { id: 3, position: AdditionalFunctions.renderDefaultPosition(), player1: "Ivan2009", player2: "Alex7902" },
        { id: 4, position: AdditionalFunctions.renderDefaultPosition(), player1: "Какой-то рандом", player2: "431245904862981" },
        { id: 5, position: AdditionalFunctions.renderDefaultPosition(), player1: "Renamed_User2132414", player2: "39633535904981" }
    ]);

    // useEffect(() => {
    //     requestListOfGames();
    // }, []);

    // async function requestListOfGames() {
    //     await POSTApiRequest("/request-list-of-games", { parameters: {} });
    // }

    return (
        <div className={styles.content}>
            <div className={styles.listOfGames}>
                {listOfGames.map((game) =>
                    <a className={styles.gamePreviewWrapper} href={"/game/" + game.id}>
                        <ChessBoardPreview key={game.id} position={game.position} />
                        <p>{game.player1} VS {game.player2}</p>
                    </a>
                )}
            </div>
        </div>
    )
}