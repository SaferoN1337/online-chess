import { RequestGameData } from "./GameApiTypes";
import Game from "../databaseRequests/Game/Game";

class GameApi {
    static requestGameData: RequestGameData = async (req, res)=> {
        const id = req.body.id;
        if(!id) {
            return res.status(400).json({ result: "error", message: "Отсутствует id" });
        }

        const game = await Game.getGameDataById(id);
        const gameHistory = await Game.getGameHistory(id);

        if(!game) {
          return res.status(400).json({ result: "error", message: "Игра не найдена" })
        } else {
            res.status(200).json({ gameData: game, gameHistory: gameHistory });
        }
    }
}

export default GameApi;