import { Socket } from "socket.io";
import { ISquare } from "../../../types";
import Game from "../databaseRequests/Game/Game";
import GameHistory from "../databaseRequests/GameHistory/GameHistory";
import WebSocketFunctions from "./WebSocketFunctions/WebSocketFunctions";
import { MoveHandlerParameters } from "./WebSocketFunctions/WebSocketFunctionsTypes";

type SocketIoCallback = ({ result }: { result: boolean }) => void;

export default function SocketIoHandler(socket: Socket<any>) {
    console.log('a user connected');
    socket.on('disconnect', () => {
        console.log('user disconnected');
    });

    socket.on("enterTheRoom", ({ roomId }: { roomId: number }, callback: SocketIoCallback) => {
        socket.join(`room ${roomId}`);
        console.log(`user joined the room ${roomId}`);
        callback({ result: true });
    });

    socket.on("userLeftTheRoom", ({ roomId }: { roomId: number })=> {
        socket.leave(`room ${roomId}`);
        console.log(`user left the room ${roomId}`);
    });

    socket.on("movePiece", async (parameters : MoveHandlerParameters, callback: SocketIoCallback) => {
        // const result = await WebSocketFunctions.move(parameters);
        // callback({ result: result });
        socket.to(`room ${parameters.moveData.roomId}`).emit("movePiece", parameters);
    });

    socket.on("castling", async (parameters: MoveHandlerParameters, callback: SocketIoCallback) => {
        // const result = await WebSocketFunctions.move(parameters);
        // callback({ result: result });
        socket.to(`room ${parameters.moveData.roomId}`).emit("castling", parameters);
    });
}