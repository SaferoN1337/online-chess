import styles from "./ChessBoard.module.css";
import Square from "./Square/Square";
import { useAppSelector, useAppDispatch } from "../../../redux/hooks/hooks"
import { useEffect } from "react";
import { runCastlingAnimation, runPieceMoveAnimation, showPiecePossibleMoves, showPromotionBlock } from "../../../redux/slices/gameSlice";
import PieceMoveAnimation from "./PieceMoveAnimations/PieceMoveAnimation";
import { socket } from "../../../skocketIo";
import { MoveData } from "../../../../../types";
import Promotion from "./Promotion/Promotion";
import CastlingAnimation from "./PieceMoveAnimations/CastlingAnimation";

export default function ChessBoard() {
    const dispatch = useAppDispatch();
    const activePiece = useAppSelector(state => state.game.activePiece);
    const activePiecePosition = useAppSelector(state => state.game.activePiecePosition);
    const playerColor = useAppSelector((state) => state.users.playerColor);
    const currentPosition = [...useAppSelector((state) => state.game.currentPosition)].reverse();
    const movePieceModelTo = useAppSelector(state => state.game.movePieceModelTo);
    const promotionMove = useAppSelector(state => state.game.promotionMove);
    const castlingData = useAppSelector(state => state.game.castlingData);
    console.log(currentPosition)

    useEffect(() => {
        if (activePiece && playerColor === activePiece.color && !movePieceModelTo) {
            dispatch(showPiecePossibleMoves());
        }
        if (promotionMove) {
            dispatch(showPromotionBlock(null));
        }
    }, [activePiece]);

    useEffect(() => {
        function movePiece(moveData: MoveData) {
            dispatch(runPieceMoveAnimation(moveData));
        }
        function castling(moveData: MoveData) {
            dispatch(runCastlingAnimation(moveData));
        }

        socket.on("castling", castling);
        socket.on("movePiece", movePiece);
        return () => {
            socket.off("castling", castling);
            socket.off("movePiece", movePiece);
        }
    }, []);


    return (
        <div className={`${styles.chessBoard} ${playerColor === "black" ? styles.rotate : ""}`}>
            {promotionMove ? <Promotion moveData={promotionMove} /> : null}
            {!activePiece || !movePieceModelTo || !activePiecePosition ? null
                :
                <PieceMoveAnimation
                    start={activePiecePosition}
                    end={movePieceModelTo}
                    piece={activePiece}
                />
            }
            {castlingData ? <CastlingAnimation castlingData={castlingData} /> : null}
            {currentPosition.map((squaresList, rowIndex) => squaresList.map((square, columnIndex) => {
                if (rowIndex % 2 === 0) {
                    if (columnIndex % 2 === 0) {
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