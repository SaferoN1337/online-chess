import { Socket } from "socket.io";
import { ISquare, MoveData } from "../../../types";
import Game from "../databaseRequests/Game/Game";

type SocketIoCallback = ({ result }: { result: boolean }) => void;

export default function socketIoHandler(socket: Socket<any>) {
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

    socket.on("movePiece", async ({ startSquare, endSquare, piece, roomId, timers }: MoveData) => {
        const game = await Game.getGameDataById(roomId);
        if(!game) return;

        const newPosition: ISquare[][] = [...game.position]; 
        newPosition[startSquare.Y][startSquare.X].piece = null;
        newPosition[endSquare.Y][endSquare.X].piece = piece;
        
        const result = Game.updateGameDataAfterMove(roomId, newPosition, timers);
        if(!result) return;

        socket.to(`room ${roomId}`).emit("movePiece", { startSquare, endSquare, piece, roomId, timers });
    });

    socket.on("castling", ({ startSquare, endSquare, piece, roomId, timers }: MoveData) => {
        socket.to(`room ${roomId}`).emit("castling", { startSquare, endSquare, piece, roomId, timers });
    });
}