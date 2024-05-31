import { Link } from "react-router-dom"
import { IGameData } from "../../../../../../types"
import ChessBoardPreview from "./ChessBoardPreview/ChessBoardPreview"
import styles from "../ListOfGames.module.css"
import useTimer from "../../../../hooks/useTimer"

interface IProps {
    game: IGameData
}

export default function GameCard({ game }: IProps) {
    const whiteTimer = useTimer(game.timers.whiteTimeLeft);
    const blackTimer = useTimer(game.timers.blackTimeLeft);
    
    return (
        <Link className={styles.gamePreviewWrapper} to={"/game/" + game.id} key={game.id}>
            <div className={styles.playersInfo}>
                <p>{game.player1} VS {game.player2}</p>
            </div>
            <ChessBoardPreview position={game.position} />
            <p>{whiteTimer} | {blackTimer}</p>
        </Link>
    )
}