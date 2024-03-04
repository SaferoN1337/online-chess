import { useAppDispatch, useAppSelector } from "../../../../redux/hooks/hooks";
import { updateActivePiece } from "../../../../redux/slices/gameSlice";
import { IPiece } from "../../../../types";
import styles from "../ChessBoard.module.css";

interface IProps {
    piece: IPiece,
    coordinateX: number,
    coordinateY: number
}
export default function Pieces({ piece, coordinateX, coordinateY }: IProps) {
    const dispatch = useAppDispatch();
    const activePiece = useAppSelector(state => state.game.activePiece);
    const playerColor = useAppSelector(state => state.users.playerColor);

    function setActivePiece() {
        if (!activePiece || activePiece?.color === piece.color) {
            dispatch(updateActivePiece({ piece, coordinateX, coordinateY }));
        }
    }

    return (
        <>
            {/* {playerColor === piece.color
                ? */}
            <div className={`${styles.piece} ${playerColor === "black" ? styles.rotate : ""}`} onMouseDown={setActivePiece} >
                <img src={"/pieces/" + `${piece.color}-${piece.type}.png`} alt={`${piece.color} ${piece.type}`} />
            </div>
            {/* :
                <div className={`${styles.piece} ${playerColor === "white" ? styles.rotate : ""}`}>
                    <img src={"/pieces/" + piece.url} alt={`${piece.color} ${piece.type}`} />
                </div>
            } */}
        </>
    )
}