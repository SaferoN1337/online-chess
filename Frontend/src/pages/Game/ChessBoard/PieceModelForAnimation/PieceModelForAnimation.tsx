import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../../../redux/hooks/hooks";
import styles from "./PieceModelForAnimation.module.css";
import { movePiece } from "../../../../redux/slices/gameSlice";
import { ICoordinates, IPiece } from "../../../../../../types";

interface IProps {
    start: ICoordinates,
    end: ICoordinates,
    piece: IPiece
}

export default function PieceModelForAnimation({ start, end, piece }: IProps) {
    const dispatch = useAppDispatch();
    const playerColor = useAppSelector(state => state.users.playerColor);
    const [currentPosition, setCurrentPosition] = useState<ICoordinates>(start);
    const [visibility, setVisibility] = useState<"hidden" | "visible">("hidden");
    const delay: number = 300;

    useEffect(() => {
        if (end.X !== start.X || end.Y !== start.Y) {
            console.time("animation")
            setCurrentPosition(end);
            setVisibility("visible");
            setTimeout(() => {
                console.timeEnd("animation")
                setVisibility("hidden");
                dispatch(movePiece(end));
            }, delay);
        }
    }, [end, start]);

    return (
        <div
            className={`${styles.pieceImgWrapper} ${playerColor === "black" ? styles.rotate : ""}`}
            style={{
                transition: `top ${delay / 1000}s, left ${delay / 1000}s`,
                visibility: visibility,
                top: `${(7 - currentPosition.Y) * 12.5}%`,
                left: `${currentPosition.X * 12.5}%`
            }}
        >
            <img
                src={"/pieces/" + `${piece?.color}-${piece?.type}.png`}
                alt={`${piece?.color} ${piece?.type}`}
            />
        </div >
    )
}