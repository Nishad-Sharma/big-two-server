import { useState, useEffect, useRef, useContext } from 'react';
import { LoginForm } from "./LoginForm";
import { Player } from "./Player";
import { Board } from "./Board";
import { CreateGame } from './CreateGame';

const cards = require.context('./card_svgs', true, /\.svg$/)
export const cardPaths = cards
    .keys()
    .reduce((images, path) => {
        images[path.split("/")[1].split(".")[0]] = cards(path)
        return images
    }, {})

export const baseURL = process.env.REACT_APP_BASE_URL || "http://localhost:8085"
export const websocketURL = process.env.REACT_APP_WEBSOCKET_URL || "ws://localhost:8085"

const GameStatus = Object.freeze({
    "Lobby": 0,
    "Playing": 1,
    "Complete": 2,
})

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

function getSelectableArray(newHand) {
    var parsedHand = [];
    newHand.forEach(card => {
        parsedHand.push([card, 0]);
    })
    return parsedHand;
}

export default function Game() {
    const [playerID, setPlayerID] = useState("");
    const gameID = 1;
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
        const url = baseURL + "/game/" + gameID;
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

        const url = baseURL + "/game/" + gameID + "/turn";
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

        if (player.hand.length > 0) {
            if ((prevPlayers.current.length == 0) || (prevPlayers.current[position].hand.length == 0)) {
                playerData[position].hand = getSelectableArray(playerData[position].hand);
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
                // Perform any necessary actions when the connection is open
            };

            socket.onmessage = (event) => {
                console.log(`Received message: ${event.data}`);
                handleServerMessage(event.data);
                // Handle the received message as required
            };

            return () => {
                socket.close();
            }

        },
        [playerID]
    )

    if (playerID == "") {
        return (
            <div>
                <LoginForm handleSubmit={handleplayerIDSubmit}></LoginForm>
                <CreateGame></CreateGame>
            </div>
        )
    } else if (players.length < 4) { // use GameSTatus???
        const connectedPlayers = [];
        players.forEach(player => {
            connectedPlayers.push(<div key={player.id}>{player.id}<br /></div>)
        })
        return (
            <div>
                <h1>Waiting for 4 players...</h1>
                <br />
                <h2>Connected:</h2>
                {connectedPlayers}
            </div>
        )
    } else {
        const connectedPlayers = [];
        var position = getSelfArrayPosition(players);

        for (var i = 0; i < players.length; i++) {
            const player = players[(i + position + 1) % players.length];
            connectedPlayers.push(<div key={player.id}><Player id={player.id} hand={player.hand} status={player.status} Fn={SelectCard} /></div>)
        }

        return (
            <div>
                <div>
                    <button onClick={() => sendTurn(false)}>
                        Play
                    </button>
                    <button onClick={() => sendTurn(true)}>
                        Pass
                    </button>
                    <button onClick={() => sortHand()}>
                        Sort
                    </button>
                    <br />
                    {connectedPlayers}
                    <Board hand={board} name="Board" />
                </div>
            </div>
        );
    }
}
