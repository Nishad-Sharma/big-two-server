import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import { WebSocketServer } from 'ws';
import GameRegistry from "./gameRegistry.ts";

let app = express();
app.use(cors());
app.use(bodyParser.json());

let port = process.env.PORT || 8085;
let wss = new WebSocketServer({ noServer: true })

var registry = new GameRegistry;

let server = app.listen(port, '0.0.0.0', () => {
    console.log(`App listening on port ${port}`)
})

server.on('upgrade', (request, socket, head) => {
    console.log("Upgrade")
    wss.handleUpgrade(request, socket, head, socket => {
        wss.emit('connection', socket, request)
    })
})

app.post('/game/1', (req, res) => {
    var game = registry.getGame(req.body.gameID);

    if (game?.isExistingPlayer(req.body.playerID)) {
        res.send("player registered");
    } else {
        if (game?.addPlayer(req.body.playerID)) {
            console.log("added shit")
            res.send("player registered"); // send proper messages
        } else {
            res.send("player not registered");
        }
    }

})

wss.on('connection', socket => {
    console.log("no clients: " + wss.clients.size);
    socket.on('error', err => console.error('Websocket error:', err))

    socket.on('message', message => {
        const data = JSON.parse(Buffer.from(message).toString());
        console.log(data);
        socket.userData = { playerID: data.message.pID, gameID: data.message.gID };
        sendSocketGameState(data.message.gID);
    })

    socket.on('close', function close() {
        console.log("Websocket closed");
    });
})

 function sendSocketGameState(gameID) {
    var game = registry.getGame(gameID);
    this.wss.clients.forEach(client => {
        if ((client.userData.gameID == gameID)) {
            var data = game?.getGameStateForPlayer(client.userData.playerID);
            client.send(JSON.stringify(data));
        }
    })
}
