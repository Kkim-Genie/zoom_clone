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



const httpServer = http.createServer(app);
const wsServer = new Server(httpServer);

const handleListen = () => console.log("Listen on http://localhost:3000");
httpServer.listen(3000, handleListen);