import { ISquare } from "../../../../types";
import Game from "../../databaseRequests/Game/Game";
import GameHistory from "../../databaseRequests/GameHistory/GameHistory";
import { MoveHandler } from "./WebSocketFunctionsTypes";

class WebSocketFunctions {
    static move: MoveHandler = async ({ moveData, gameHistoryMove })=> {
        const game = await Game.getGameDataById(moveData.roomId);
        if(!game) { 
            return false;
        };

        const newPosition: ISquare[][] = game.position.map(line=> line.map(square=> square)); 
        newPosition[moveData.startSquare.Y][moveData.startSquare.X].piece = null;
        newPosition[moveData.endSquare.Y][moveData.endSquare.X].piece = moveData.piece;
        
        const gameUpdated = await Game.updateGameDataAfterMove(moveData.roomId, newPosition, moveData.timers);
        const historyUpdated = await GameHistory.updateGameHistory(gameHistoryMove, moveData.roomId);

        if(!gameUpdated || !historyUpdated) { 
            return false;
        } else {
            return true;
        }
    }
}

export default WebSocketFunctions;