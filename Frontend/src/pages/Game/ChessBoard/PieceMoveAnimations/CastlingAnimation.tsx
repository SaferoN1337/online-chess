import { useEffect, useState } from "react";
import { ICastlingData, ICoordinates } from "../../../../../../types";
import PieceModel from "./PieceModel/PieceModel";
import { useAppDispatch } from "../../../../redux/hooks/hooks";
import { castling } from "../../../../redux/slices/gameSlice";

interface IProps {
    castlingData: ICastlingData
}

export default function CastlingAnimation({ castlingData }: IProps) {
    const dispatch = useAppDispatch();
    const [castlePosition, setCastlePosition] = useState<ICoordinates>(castlingData.castleCorrdinates.startSquare);
    const [kingPosition, setKingPosition] = useState<ICoordinates>(castlingData.kingCorrdinates.startSquare);
    const [visibility, setVisibility] = useState<"hidden" | "visible">("hidden");
    const delay: number = 300;

    useEffect(() => {
        setKingPosition(castlingData.kingCorrdinates.endSquare);
        setCastlePosition(castlingData.castleCorrdinates.endSquare);
        setVisibility("visible");
        setTimeout(() => {
            setVisibility("hidden");
            dispatch(castling());
        }, delay);
    }, []);

    return (
        <>
            {castlingData === null ? null :
                <>
                    <PieceModel
                        piece={castlingData.castle}
                        piecePosition={castlePosition}
                        visibility={visibility}
                        delay={delay}
                    />
                    <PieceModel
                        piece={castlingData.king}
                        piecePosition={kingPosition}
                        visibility={visibility}
                        delay={delay}
                    />
                </>
            }
        </>
    )
}