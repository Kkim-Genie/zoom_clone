import http from "http";
import { Server } from "socket.io";
import express from "express";
import { Socket } from "dgram";

const app = express();

app.set('view engine', 'pug');
app.set("views", __dirname + "/views");
app.use("/public", express.static(__dirname + "/public"));
app.get('/', (_, res) => res.render("home"));
app.get('/*', (_, res) => res.redirect('/'));


const handleListen = () => console.log("Listen on http://localhost:3000");

const httpServer = http.createServer(app);
const wsServer = new Server(httpServer);

wsServer.on("connection", socket => {
    socket.on("enter_room", (roomName, done) => {
        console.log(roomName);
        setTimeout(() => {
            done();
        }, 5000);
    });
})

// const wss = new WebSocket.Server({ server });
// const sockets = [];

// wss.on("connection", (socket) => {
//     sockets.push(socket);
//     socket["nickname"] = "Anon";
//     console.log("Connected to Browser 🟩");
//     socket.on("close", () => console.log("Disconnected From the Browser 🟥"));
//     socket.on("message", (msg) => {
//         const message = JSON.parse(msg.toString('utf8'));
//         switch (message.type){
//             case "new_message":
//                 sockets.forEach((aSocket) => aSocket.send(`${socket.nickname}: ${message.payload}`));
//                 break;
//             case "nickname":
//                 socket["nickname"] = message.payload;
//                 break;
//             default:
//                 console.log("message error");
//         }
//     });
// });

httpServer.listen(3000, handleListen);