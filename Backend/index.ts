import express from "express";
import cors from "cors";
import http from "http";
import { Server } from "socket.io";
import SocketIoHandler from "./services/webSocket/SocketIoHandler";
import { router } from "./Router/Router";
import Fingerprint from "express-fingerprint";
import cookieParser from "cookie-parser";

const app = express();
const port = 3001;
const server = http.createServer(app);
const io = new Server(server);

app.disable('x-powered-by');
app.use(cors({ origin: "http://localhost:3000", methods: ["GET", "POST"] }));
app.use((req, res, next) => {
    console.log(req.url);
    next();
});

io.on('connection', SocketIoHandler);
app.use('/', express.static('Frontend/dist/'));
app.use(express.urlencoded({ extended: false })); 
app.use(express.json());
app.use(Fingerprint());
app.use(cookieParser());
app.use(router);

server.listen(port, () => { console.log(`Server is running on PORT ${port}...`) });