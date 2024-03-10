import styles from "./ChessBoard.module.css";
import Square from "./Square/Square";
import { useAppSelector, useAppDispatch } from "../../../redux/hooks/hooks"
import { useEffect } from "react";
import { renderDefaultPosition, showPiecePossibleMoves } from "../../../redux/slices/gameSlice";
import PieceModelForAnimation from "./PieceModelForAnimation/PieceModelForAnimation";

export default function ChessBoard() {
    const activePiece = useAppSelector(state => state.game.activePiece);
    const playerColor = useAppSelector((state) => state.users.playerColor);
    const currentPosition = [...useAppSelector((state) => state.game.currentPosition)].reverse();
    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(renderDefaultPosition());
    }, [playerColor]);

    useEffect(() => {
        if (activePiece) {
            dispatch(showPiecePossibleMoves());
        }
    }, [activePiece]);

    return (
        <div className={`${styles.chessBoard} ${playerColor === "black" ? styles.rotate : ""}`}>
            {activePiece !== null ? <PieceModelForAnimation /> : null}
            {currentPosition.map((squaresList, rowIndex) => squaresList.map((square, columnIndex) => {
                if (rowIndex % 2 === 0) {
                    if (rowIndex % 2 === 0 && columnIndex % 2 === 0) {
                        return <Square color="white" key={`${rowIndex}${columnIndex}`} square={square} />
                    } else {
                        return <Square color="black" key={`${rowIndex}${columnIndex}`} square={square} />
                    }
                } else {
                    if (columnIndex % 2 === 1) {
                        return <Square color="white" key={`${rowIndex}${columnIndex}`} square={square} />
                    } else {
                        return <Square color="black" key={`${rowIndex}${columnIndex}`} square={square} />
                    }
                }
            }))}
        </div>
    )
}