import { useAppDispatch, useAppSelector } from "../../../../redux/hooks/hooks";
import { updateActivePiece } from "../../../../redux/slices/gameSlice";
import { IPiece } from "../../../../../../types";
import styles from "./Piece.module.css";

interface IProps {
    piece: IPiece,
    X: number,
    Y: number
}
export default function Pieces({ piece, X, Y }: IProps) {
    const dispatch = useAppDispatch();
    const activePiece = useAppSelector(state => state.game.activePiece);
    const playerColor = useAppSelector(state => state.users.playerColor);
    const moveColor = useAppSelector(state=> state.game.moveColor);
    
    function setActivePiece() {
        if (!activePiece || activePiece?.color === piece.color) {
            dispatch(updateActivePiece({ piece, X, Y }));
        }
    }

    return (
        <>
            {moveColor === piece.color
                ?
                <div className={`${styles.piece} ${playerColor === "black" ? styles.rotate : ""}`} onMouseDown={setActivePiece} >
                    <img src={`/pieces/${piece.color}-${piece.type}.png`} alt={`${piece.color} ${piece.type}`} />
                </div>
                :
                <div className={`${styles.piece} ${playerColor === "black" ? styles.rotate : ""}`} >
                    <img src={`/pieces/${piece.color}-${piece.type}.png`} alt={`${piece.color} ${piece.type}`} />
                </div>
            }
        </>
    )
}