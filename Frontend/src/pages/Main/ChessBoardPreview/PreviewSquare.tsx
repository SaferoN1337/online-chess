import styles from "./ChessBoardPreview.module.css";
import { ISquare } from "../../../../../types";
import classNames from "classnames";

interface IProps {
    rowIndex: number,
    columnIndex: number,
    squareData: ISquare
}

export default function PreviewSquare({ rowIndex, columnIndex, squareData }: IProps) {
    let colorClass = styles.black;

    if (rowIndex % 2 === 0) {
        if (columnIndex % 2 === 0) {
            colorClass = styles.white;
        }
    } else {
        if (columnIndex % 2 === 1) {
            colorClass = styles.white;
        }
    }

    return (
        <div className={classNames(styles.square, colorClass)} >
            {!squareData.piece ? null :
                <div className={styles.piece} >
                    <img
                        src={`/pieces/${squareData.piece.color}-${squareData.piece.type}.png`}
                        alt={`${squareData.piece.color} ${squareData.piece.type}`}
                    />
                </div>
            }
        </div>
    )
}