import { RequestGameData, RequestListOfGames } from "./GameApiTypes";
import Game from "../databaseRequests/Game/Game";
import GameHistory from "../databaseRequests/GameHistory/GameHistory";

class GameApi {
    static requestGameData: RequestGameData = async (req, res)=> {
        const id = req.body.id;
        if(!id) {
            return res.status(400).json({ result: "error", message: "Отсутствует id" });
        }

        const game = await Game.getGameDataById(id);
        const gameHistory = await GameHistory.getGameHistory(id);

        if(!game) {
          return res.status(400).json({ result: "error", message: "Игра не найдена" })
        } else {
            res.status(200).json({ gameData: game, gameHistory: gameHistory });
        }
    }

    static requestListOfGames: RequestListOfGames = async (req, res)=> {
        const parameters = req.body.parameters;

    }
}

export default GameApi;