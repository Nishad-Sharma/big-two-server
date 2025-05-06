import { useState, useEffect, useRef } from 'react';
import { GameOver } from "./GameOver";
import { JoinGame } from "./JoinGame";
import { Lobby } from "./Lobby";
import { PlayingGame } from "./PlayingGame";

export const baseURL = process.env.REACT_APP_BASE_URL || "http://localhost:8085"
export const websocketURL = process.env.REACT_APP_WEBSOCKET_URL || "ws://localhost:8085"

const GameStatus = Object.freeze({
    "Lobby": 0,
    "Playing": 1,
    "Complete": 2,
})

export const playerLayout = ["left", "top", "right", "self"];

const HighCardRanking = Object.freeze({
    "3d": 1,
    "3c": 2,
    "3h": 3,
    "3s": 4,
    "4d": 5,
    "4c": 6,
    "4h": 7,
    "4s": 8,
    "5d": 9,
    "5c": 10,
    "5h": 11,
    "5s": 12,
    "6d": 13,
    "6c": 14,
    "6h": 15,
    "6s": 16,
    "7d": 17,
    "7c": 18,
    "7h": 19,
    "7s": 20,
    "8d": 21,
    "8c": 22,
    "8h": 23,
    "8s": 24,
    "9d": 25,
    "9c": 26,
    "9h": 27,
    "9s": 28,
    "10d": 29,
    "10c": 30,
    "10h": 31,
    "10s": 32,
    "Jd": 33,
    "Jc": 34,
    "Jh": 35,
    "Js": 36,
    "Qd": 37,
    "Qc": 38,
    "Qh": 39,
    "Qs": 40,
    "Kd": 41,
    "Kc": 42,
    "Kh": 43,
    "Ks": 44,
    "Ad": 45,
    "Ac": 46,
    "Ah": 47,
    "As": 48,
    "2d": 49,
    "2c": 50,
    "2h": 51,
    "2s": 52,
});

const SuitValue = Object.freeze({
    "d": 0,
    "c": 100,
    "h": 200,
    "s": 300
});

function CountSelected(hand) {
    return Array.from(hand).filter((card) => card[1] == 1).length;
};

function sortHandByRank(hand) {
    const sortedHand = hand.toSorted((a, b) => {
        return HighCardRanking[a[0]] - HighCardRanking[b[0]];
    });
    return sortedHand
};

function sortHandBySuit(hand) {
    const sortedHand = hand.toSorted((a, b) => {
        return (HighCardRanking[a[0]] + SuitValue[a[0].slice(-1)]) - (HighCardRanking[b[0]] + SuitValue[b[0].slice(-1)]);
    });
    return sortedHand;
}

function areArraysEqual(a, b) {
    if (a === b) return true;
    if (a == null || b == null) return false;
    if (a.length !== b.length) return false;

    for (var i = 0; i < a.length; ++i) {
        if (a[i] !== b[i]) return false;
    }
    return true;
}

function updateSelectableArray(newHand, prevHand) {
    var parsedHand = [];
    prevHand.forEach(card => {
        if (newHand.includes(card[0])) {
            parsedHand.push(card);
        }
    })
    return parsedHand;
}

function createSelectableArray(newHand) {
    var parsedHand = [];
    newHand.forEach(card => {
        parsedHand.push([card, 0]);
    })
    return parsedHand;
}

function copyLink() {
    var copyText = document.getElementById("link").href;
    navigator.clipboard.writeText(copyText);
}

export default function Game() {
    const [playerID, setPlayerID] = useState("");
    // const gameID = 1;
    const [gameID, setGameID] = useState(window.location.href.split("/").at(-1));
    const [board, setBoard] = useState(new Array());
    const [players, setPlayers] = useState(new Array());
    const [gameStatus, setGameStatus] = useState(GameStatus.Lobby);
    const [sort, setSort] = useState(0);
    const prevPlayers = useRef(null);

    console.log(baseURL);

    useEffect(
        () => {
            prevPlayers.current = players;
        },
        [players]
    );

    function handleplayerIDSubmit(pID) {
        if (pID == "") return;
        const url = baseURL + "/joinGame";
        const payload = { playerID: pID, gameID: gameID };
        fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(payload)
        })
            .then(response => response.text())
            .then(data => {
                if (data == "player registered") {
                    setPlayerID(pID)
                }
            })
    }

    function sortHand() {
        var position = getSelfArrayPosition(players);
        var currentPlayers = [...players];

        if (areArraysEqual(sortHandByRank(players[position].hand), players[position].hand)) {
            const sortedHand = sortHandBySuit(players[position].hand);
            currentPlayers[position].hand = sortedHand;
            setPlayers(currentPlayers);
        } else {
            const sortedHand = sortHandByRank(players[position].hand);
            currentPlayers[position].hand = sortedHand;
            setPlayers(currentPlayers);
        }
    }

    function sendTurn(isPass) {
        var hand = getPlayer().hand;
        if (getPlayer().status != "turn") return;
        if (CountSelected(hand) == 0 && !isPass) return;

        var turnArray = new Array();
        hand.forEach((card) => {
            if (card[1] === 1) {
                turnArray.push(card[0]);
            }
        })

        const url = baseURL + "/sendTurn";
        const payload = { playerID: playerID, gameID: gameID, hand: turnArray };
        if (isPass) payload['hand'] = [];

        const response = fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(payload)
        })
    }

    function sendRestartGame() {
        const url = baseURL + "/restartGame";
        const payload = { gameID: gameID };
        const response = fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(payload)
        })
    }

    function getPlayer() {
        const player = players.find((p) => p.id == playerID);
        return player;
    }

    function SelectCard(selected) {
        const currentPlayers = [...players];
        var playerHand = getPlayer().hand;
        playerHand.forEach((card, index) => {
            if (card[0] == selected.value) {
                if (card[1] == 0) {
                    if (CountSelected(playerHand) < 5) {
                        playerHand[index][1] = 1;
                    }
                } else {
                    playerHand[index][1] = 0;
                }
            }
        })
        currentPlayers[getSelfArrayPosition(players)].hand = playerHand;
        setPlayers(currentPlayers);
    };

    function getSelfArrayPosition(parsedPlayers) {
        for (const [i, player] of parsedPlayers.entries()) {
            if (player.id == playerID) {
                return i;
            }
        }
        console.log("Error! player not in gamestate")
        return -1;
    }

    function handlePlayerData(playerData) {
        var player = playerData.find(p => Array.isArray(p.hand));
        const position = getSelfArrayPosition(playerData);

        // bad if player actions can be taken after game over or if restartGame can be called during play
        if (gameStatus == GameStatus.Complete) {
            playerData[position].hand = createSelectableArray(playerData[position].hand);
            return playerData;
        }

        // if player has cards
        if (player.hand.length > 0) {
            // Check if last render; players was not null, no. of players was 0, players hand was empty (this is important, get the 
            // moment game state shifts from no cards dealt to cards dealt - also happens during restartGame logic)
            if (!prevPlayers.current || prevPlayers.current.length == 0 || prevPlayers.current[position].hand.length == 0) {
                playerData[position].hand = createSelectableArray(playerData[position].hand);
            } else {
                const prevHand = prevPlayers.current[position].hand;
                playerData[position].hand = updateSelectableArray(playerData[position].hand, prevHand);
            }
        }
        return playerData;
    }

    function handleServerMessage(data) {
        const parsedData = JSON.parse(data);
        const handledPlayerData = handlePlayerData(parsedData.players);
        setBoard(parsedData.board);
        setPlayers(handledPlayerData);
        setGameStatus(parsedData.status);

        // after last hand is played, gameStatus has been set to complete,
        // we also set everyones prevPlayers to null
        if (parsedData.status == GameStatus.Complete) {
            prevPlayers.current = null;
        }
    }

    useEffect(
        () => {
            if (playerID == "") {
                return;
            }
            const socket = new WebSocket(websocketURL);

            // Handle connection open
            socket.onopen = () => {
                console.log('WebSocket connection established');
                socket.send(JSON.stringify({ type: 'initSocket', message: { pID: playerID, gID: gameID } }))
            };

            socket.onmessage = (event) => {
                console.log(`Received message: ${event.data}`);
                handleServerMessage(event.data);
            };

            return () => {
                socket.close();
            }
        },
        [playerID]
    )

    if (playerID == "") {
        return <JoinGame handleplayerIDSubmit={handleplayerIDSubmit} copyLink={copyLink} />;
    } else if (gameStatus == GameStatus.Lobby) {
        return <Lobby players={players} copyLink={copyLink} />;
    } else if (gameStatus == GameStatus.Playing) {
        return (
            <PlayingGame
                players={players}
                playerID={playerID}
                playerLayout={playerLayout}
                SelectCard={SelectCard}
                sortHand={sortHand}
                sendTurn={sendTurn}
                board={board}
            />
        );
    } else if (gameStatus == GameStatus.Complete) {
        return (
            // retain snapshot of end of game screen and place Gameover section ontop
            <div>
                <PlayingGame
                    players={players}
                    playerID={playerID}
                    playerLayout={playerLayout}
                    SelectCard={SelectCard}
                    sortHand={sortHand}
                    sendTurn={sendTurn}
                    board={board}
                />
                <GameOver players={players} Fn={sendRestartGame} />
            </div>
        );
    }
}
