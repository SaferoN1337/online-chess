import styles from "./ChessBoardPreview.module.css";
import { ISquare } from "../../../../../../../types";
import PreviewSquare from "./PreviewSquare";
import classNames from "classnames";

interface IProps {
    position: ISquare[][];
}

export default function ChessBoardPreview({ position }: IProps) {

    return (
        <div className={classNames(styles.chessBoard)}>
            {position.map((line, rowIndex) =>
                line.map((square, columnIndex) =>
                    <PreviewSquare
                        key={`${rowIndex}${columnIndex}`}
                        rowIndex={rowIndex}
                        columnIndex={columnIndex}
                        squareData={square}
                    />
                )
            )}
        </div>
    )
}