import { Socket } from "socket.io";
import { MoveData } from "../../../types";

type SocketIoCallback = ({ result }: { result: boolean }) => void;

export default function socketIoHandler(socket: Socket<any>) {
    console.log('a user connected');
    socket.on('disconnect', () => {
        console.log('user disconnected');
    });

    socket.on("enterTheRoom", ({ roomId }: { roomId: number }, callback: SocketIoCallback) => {
        socket.join(`room ${roomId}`);
        console.log(`user joined room ${roomId}`);
        callback({ result: true });
    });

    socket.on("movePiece", ({ startSquare, endSquare, piece, roomId, timers }: MoveData) => {
        socket.to(`room ${roomId}`).emit("movePiece", { startSquare, endSquare, piece, roomId, timers });
    });

    socket.on("castling", ({ startSquare, endSquare, piece, roomId, timers }: MoveData) => {
        socket.to(`room ${roomId}`).emit("castling", { startSquare, endSquare, piece, roomId, timers });
    });

}