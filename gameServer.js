import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import WebSocket, { WebSocketServer } from 'ws';

import Game from "./game.ts";

export default class GameServer {
    constructor() {
        this.games = [] // maybe should be map to easily access gameid
        this.app = express();
        this.app.use(cors());
        this.app.use(bodyParser.json());
        
        this.port = process.env.PORT || 8085;
        this.wss = new WebSocketServer({ noServer: true })
        
        this.server = this.app.listen(this.port, '0.0.0.0', () => {
            console.log(`App listening on port ${this.port}`)
        })

        this.server.on('upgrade', (request, socket, head) => {
            console.log("Upgrade")
            this.wss.handleUpgrade(request, socket, head, socket => {
                this.wss.emit('connection', socket, request)
            })
        })

        this.app.post('/game/1', (req, res) => {
            console.log("name submit");
            console.log(req.body.playerID);
            console.log(req.body.gameID);
            var game = this.getGame(req.body.gameID);
            console.log("printing game");
            console.log(game);
            if (game.isExistingPlayer(req.body.playerID)) {
                res.send("player registered");
            } else {
                if (game.addPlayer(req.body.playerID)) {
                    console.log("added shit")
                    res.send("player registered"); // send proper messages
                } else {
                    res.send("player not registered");
                }
            }
        })

        this.wss.on('connection', socket => {
            console.log("no clients: "  + this.wss.clients.size);
            socket.on('error', err => console.error('Websocket error:', err))
        
            socket.on('message', message => {
                console.log(message);
                const data = JSON.parse(Buffer.from(message).toString());
                console.log(data);
                console.log(data.message.pID);
                console.log(data.message.gID);
                socket.userData = { playerID: data.message.pID, gameID: data.message.gID};
            })  
        
            socket.on('close', function close() {
                console.log("Websocket closed");
            });
        })
  
    }

    createGame() {
        var game = new Game(1); // GameID will probably be a random generated string later and you check if string already exists?
        this.games.push(game);
        console.log("Creating game");
        console.log(this.games);
    }

    getGame(id) {
        var game = this.games.find((game) => game.id == id); // is this reference? or copy check
        return game;
    }
}