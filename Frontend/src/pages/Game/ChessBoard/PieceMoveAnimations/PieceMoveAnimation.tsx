import { useEffect, useState } from "react";
import { useAppDispatch } from "../../../../redux/hooks/hooks";
import { movePiece } from "../../../../redux/slices/gameSlice";
import { ICoordinates, IPiece } from "../../../../../../types";
import PieceModel from "./PieceModel/PieceModel";

interface IProps {
    start: ICoordinates,
    end: ICoordinates,
    piece: IPiece
}

export default function PieceModelForAnimation({ start, end, piece }: IProps) {
    const dispatch = useAppDispatch();
    const [piecePosition, setPiecePosition] = useState<ICoordinates>(start);
    const [visibility, setVisibility] = useState<"hidden" | "visible">("hidden");
    const delay: number = 300;

    useEffect(() => {
        if (end.X !== start.X || end.Y !== start.Y) {
            setPiecePosition(end);
            setVisibility("visible");
            setTimeout(() => {
                setVisibility("hidden");
                dispatch(movePiece(end));
            }, delay);
        }
    }, [end, start]);
    
    return (
        <PieceModel
            piece={piece}
            piecePosition={piecePosition}
            visibility={visibility}
            delay={delay}
        />
    )
}