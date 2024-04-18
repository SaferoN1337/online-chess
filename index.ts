import express from "express";
import cors from "cors";
import http from "http";
import { Server } from "socket.io";
import type { ICoordinates, IPiece, MoveData } from "./types"
const app = express();
const port = 3001;
const server = http.createServer(app);
const io = new Server(server);

type SocketIoCallback = ({ result }: { result: boolean }) => void;

// app.use(cors({ origin: "http://localhost:3000", methods: ["GET", "POST"] }));
app.use((req, res, next) => {
    console.log(req.url);
    next();
});
app.use('/assets', express.static('Frontend/dist/assets'));

app.get('/', (req, res) => {
    res.sendFile(__dirname + "/Frontend/dist/index.html");
});

io.on('connection', (socket) => {
    console.log('a user connected');
    socket.on('disconnect', () => {
        console.log('user disconnected');
    });

    socket.on("enterTheRoom", ({ roomId }: { roomId: number }, callback: SocketIoCallback) => {
        socket.join(`room ${roomId}`);
        console.log(`user joined room ${roomId}`);
        callback({ result: true });
    });

    socket.on("movePiece", ({ startSquare, endSquare, piece, roomId, timers }: MoveData)=> {
        socket.to(`room ${roomId}`).emit("movePiece", { startSquare, endSquare, piece, roomId, timers });
    });

    socket.on("castling", ({ startSquare, endSquare, piece, roomId, timers }: MoveData)=> {
        socket.to(`room ${roomId}`).emit("castling", { startSquare, endSquare, piece, roomId, timers });
    });
});

server.listen(port, () => { console.log(`Server is running on PORT ${port}...`) });