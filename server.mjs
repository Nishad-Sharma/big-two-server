import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import { WebSocketServer } from 'ws';
import GameRegistry from "./gameRegistry.ts";
import { GameStatus } from "./game.ts"

let app = express();
app.use(cors());
app.use(bodyParser.json());

let port = process.env.PORT || 8085;
let wss = new WebSocketServer({ noServer: true });

var registry = new GameRegistry;

registry.createGameWithId("1");

let server = app.listen(port, '0.0.0.0', () => {
    console.log(`App listening on port ${port}`);
})

server.on('upgrade', (request, socket, head) => {
    console.log("Upgrade");
    wss.handleUpgrade(request, socket, head, socket => {
        wss.emit('connection', socket, request);
    })
})

app.post('/game/1', (req, res) => {
    var game = registry.getGame(req.body.gameID);

    if (game?.isExistingPlayer(req.body.playerID)) {
        if (isPlayerSocketActive(wss, req.body.playerID, req.body.gameID)) {
            res.send("player not registered");
        } else {
            res.send("player registered");
        }
    } else {
        if (game?.addPlayer(req.body.playerID)) {
            res.send("player registered");
        } else {
            res.send("player not registered");
        }
    }
})

app.post('/game/1/turn', (req, res) => {
    var game = registry.getGame(req.body.gameID);
    let id = req.body.playerID;
    let hand = req.body.hand;

    if (game.executeTurn(id, hand)) {
        res.statusCode = 200;
        sendSocketGameState(wss, req.body.gameID);
        res.send("executed turn");
    } else {
        res.statusCode = 500;
        res.send("turn failed to execute");
    }
})

app.post('/game', (_, res) => {
    let gameId = registry.createGame();
    if (gameId.kind == "ok") {
        res.statusCode = 200;
        res.json({ "gameId": gameId.value })
    } else {
        res.statusCode = 500;
        res.json({ "error": gameId.error })
    }
})

wss.on('connection', socket => {
    console.log("no clients: " + wss.clients.size);
    socket.on('error', err => console.error('Websocket error:', err))

    socket.on('message', message => {
        const data = JSON.parse(Buffer.from(message).toString());
        console.log(data);
        socket.userData = { playerID: data.message.pID, gameID: data.message.gID };
        sendSocketGameState(wss, data.message.gID);
    })

    socket.on('close', function close() {
        var game = registry.getGame(socket.userData.gameID);
        if (game.status == GameStatus.Lobby) {
            game.removePlayer(socket.userData.playerID);
            sendSocketGameState(wss, socket.userData.gameID);
        }
        console.log("Websocket closed");
    });
})

function sendSocketGameState(wss, gameID) {
    var game = registry.getGame(gameID);
    wss.clients.forEach(client => {
        if (client.userData.gameID == gameID) {
            var data = game?.getGameStateForPlayer(client.userData.playerID);
            client.send(JSON.stringify(data));
        }
    })
}

function isPlayerSocketActive(wss, playerID, gameID) {
    var found = false;
    wss.clients.forEach(client => {
        if (client.userData.gameID == gameID && client.userData.playerID == playerID) {
            found = true;
        }
    })
    return found;
}
