import { useAppDispatch, useAppSelector } from "../../../../redux/hooks/hooks";
import { movePiece } from "../../../../redux/slices/gameSlice";
import { ISquare } from "../../../../types";
import styles from "../ChessBoard.module.css";
import Pieces from "../Pieces/Pieces";

interface IProps {
    color: "white" | "black",
    square: ISquare,
}

export default function Square({ color, square }: IProps) {
    const dispatch = useAppDispatch();
    const activePiece = useAppSelector(state => state.game.activePiece);
    const activePiecePosition = useAppSelector(state => state.game.activePiecePosition);

    // const letters: string[] = ["a", "b", "c", "d", "e", "f", "g", "h"];

    function move() {
        // console.log(letters[square.coordinateX], square.coordinateY + 1)
        console.log(square.coordinateX, square.coordinateY)
        if (activePiece && activePiecePosition && square.possibleMove) {
            dispatch(movePiece({ coordinateX: square.coordinateX, coordinateY: square.coordinateY }));
        }
    }

    return (
        <div
            className={`${styles.square} ${color === "white" ? styles.white : styles.black}`}
            onClick={move}
            style={square.possibleMove && square.piece ? { backgroundColor: "greenyellow" } : {}}
        >
            {square.possibleMove && !square.piece ? <div className={styles.greenDot} /> : null}
            {square.piece ? <Pieces
                piece={square.piece}
                coordinateX={square.coordinateX}
                coordinateY={square.coordinateY}
            /> : null}
        </div>
    )
}