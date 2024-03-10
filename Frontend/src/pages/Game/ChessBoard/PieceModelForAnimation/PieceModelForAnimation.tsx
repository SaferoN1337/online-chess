import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../../../redux/hooks/hooks";
import styles from "./PieceModelForAnimation.module.css";
import { movePiece } from "../../../../redux/slices/gameSlice";
import { IPiece } from "../../../../types";

export default function PieceModelForAnimation() {
    const dispatch = useAppDispatch();
    const activePiece = useAppSelector(state => state.game.activePiece);
    const activePiecePosition = useAppSelector(state => state.game.activePiecePosition);
    const modelCoordinates = useAppSelector(state => state.game.pieceModelCoordinates);

    const [piece, setPiece] = useState<IPiece | null>(null);
    const [currentCoordinates, setCurrentCoordinates] = useState<{ X: number, Y: number } | null>(null);

    const top: string = currentCoordinates ? `${(7 - currentCoordinates.Y) * 12.5}%` : "";
    const left: string = currentCoordinates ? `${currentCoordinates.X * 12.5}%` : "";
    const visibility: "hidden" | "visible" = currentCoordinates?.X === activePiecePosition?.coordinateX && currentCoordinates?.Y === activePiecePosition?.coordinateY ? "hidden" : "visible";
    const delay: number = 300;

    if (!modelCoordinates || !activePiece) {
        return null;
    }

    useEffect(() => {
        setCurrentCoordinates(modelCoordinates);
    }, [modelCoordinates]);

    useEffect(() => {
        if (currentCoordinates !== null && (currentCoordinates?.X !== activePiecePosition?.coordinateX || currentCoordinates?.Y !== activePiecePosition?.coordinateY)) {
            setTimeout(() => {
                dispatch(movePiece({ coordinateX: modelCoordinates.X, coordinateY: modelCoordinates.Y }));
            }, delay)
        }
    }, [currentCoordinates]);

    useEffect(() => {
        setPiece(activePiece);
    }, [activePiece]);

    return (
        <div
            className={styles.pieceImgWrapper}
            style={{
                transition: `top ${delay / 1000}s, left ${delay / 1000}s`,
                visibility: visibility,
                top: top,
                left: left
            }}
        >
            <img
                src={"/pieces/" + `${piece?.color}-${piece?.type}.png`}
                alt={`${piece?.color} ${piece?.type}`}
            />
        </div >
    )
}