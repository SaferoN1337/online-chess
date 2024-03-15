import { Colors, ISquare, PieceTypes } from "../../../../../types";

export default function renderDefaultPosition() {
    const emptyArrays: ISquare[][] = new Array(8).fill(new Array(8).fill(undefined));

    return emptyArrays.map((squaresList, lineIndex) => squaresList.map((_, columnIndex) => {
        const defaultData: ISquare = {
            possibleMove: false,
            attacked: false,
            X: columnIndex,
            Y: lineIndex,
            piece: null
        }

        if (defaultData.Y === 6 || defaultData.Y === 1) {
            defaultData.piece = {
                color: defaultData.Y === 6 ? "black" : "white",
                type: "pawn"
            }
        } else if (defaultData.Y === 0 || defaultData.Y === 7) {
            let type: PieceTypes = "king";
            let color: Colors = defaultData.Y === 7 ? "black" : "white";

            if (defaultData.X === 0 || defaultData.X === 7) {
                type = "castle";
            } else if (defaultData.X === 1 || defaultData.X === 6) {
                type = "knight";
            } else if (defaultData.X === 2 || defaultData.X === 5) {
                type = "bishop";
            } else if (defaultData.X === 3) {
                type = "queen";
            }

            defaultData.piece = {
                color: color,
                type: type
            }
        }

        return defaultData
    })
    );
}