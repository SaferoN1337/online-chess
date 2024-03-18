import { ICoordinates, IPiece } from "../../../../../../../types";
import { useAppSelector } from "../../../../../redux/hooks/hooks";
import styles from "./PieceModel.module.css";

interface IProps {
    piece: IPiece,
    piecePosition: ICoordinates,
    visibility: "hidden" | "visible",
    delay: number
}

export default function PieceModel({ piece, piecePosition, visibility, delay }: IProps) {
    const playerColor = useAppSelector(state => state.users.playerColor);

    return (
        <div
            className={`${styles.pieceImgWrapper} ${playerColor === "black" ? styles.rotate : ""}`}
            style={{
                transition: `top ${delay / 1000}s, left ${delay / 1000}s`,
                visibility: visibility,
                top: `${(7 - piecePosition.Y) * 12.5}%`,
                left: `${piecePosition.X * 12.5}%`
            }}
        >
            <img
                src={"/pieces/" + `${piece?.color}-${piece?.type}.png`}
                alt={`${piece?.color} ${piece?.type}`}
            />
        </div >
    )
}