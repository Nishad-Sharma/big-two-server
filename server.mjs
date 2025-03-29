import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import WebSocket, { WebSocketServer } from 'ws';
import Game from "./game.ts";

var game = new Game();

export const HandType = Object.freeze({
    "Invalid" : 1,
    "HighCard" : 2,
    "Pair" : 3,
    "ThreeOfAKind" : 4,
    "FourOfAKind" : 5,
    "Straight" : 6,
    "Flush" : 7,
    "FullHouse" : 8,
    "Bomb" : 9,
    "StraightFlush" : 10,
});

const RankOrder = Object.freeze({
    "3" : 1,
    "4" : 2,
    "5" : 3,
    "6" : 4,
    "7" : 5,
    "8" : 6,
    "9" : 7,
    "10" : 8,
    "J" : 9,
    "Q" : 10,
    "K" : 11,
    "A" : 12,
    "2" : 13,
})

export const HighCardRanking = Object.freeze({
    "3d" : 1,
    "3c" : 2,
    "3h" : 3,
    "3s" : 4,
    "4d" : 5,
    "4c" : 6,
    "4h" : 7,
    "4s" : 8,
    "5d" : 9,
    "5c" : 10,
    "5h" : 11,
    "5s" : 12,
    "6d" : 13,
    "6c" : 14,
    "6h" : 15,
    "6s" : 16,
    "7d" : 17,
    "7c" : 18,
    "7h" : 19,
    "7s" : 20,
    "8d" : 21,
    "8c" : 22,
    "8h" : 23,
    "8s" : 24,
    "9d" : 25,
    "9c" : 26,
    "9h" : 27,
    "9s" : 28,
    "10d" : 29,
    "10c" : 30,
    "10h" : 31,
    "10s" : 32,
    "Jd" : 33,
    "Jc" : 34,
    "Jh" : 35,
    "Js" : 36,
    "Qd" : 37,
    "Qc" : 38,
    "Qh" : 39,
    "Qs" : 40,
    "Kd" : 41,
    "Kc" : 42,
    "Kh" : 43,
    "Ks" : 44,
    "Ad" : 45,
    "Ac" : 46,
    "Ah" : 47,
    "As" : 48,
    "2d" : 49,
    "2c" : 50,
    "2h" : 51,
    "2s" : 52,
});

export function isHighCard(hand) {
    if (hand.length == 1) {
        return true;
    }
    return false;
};

export function isPair(hand) {
  if (hand.length == 2 && (rankMatch(hand))) {
      return true;
  }
  return false;
}

export function isThreeOfAKind(hand) {
  if (hand.length == 3 && (rankMatch(hand))) {
      return true;
  }
  return false;
};

export function isFourOfAKind(hand) {
  if (hand.length == 4 && (rankMatch(hand))) {
      return true;
  }
  return false;
};

export function areEqual() {
  var len = arguments.length;
  for (var i = 1; i< len; i++){
      if (arguments[i] === null || arguments[i] !== arguments[i-1])
          return false;
  }
  return true;
};

export function rankMatch(hand) {
  let rank = hand[0].substring(0, hand[0].length-1)
  for (const card of hand) {
      if (!(card.substring(0, card.length-1) == rank)) {
          return false;
      }
  }
  return true;
};

function sortHandByRank(hand) {
  const sortedHand = hand.sort((a,b) => {
      return HighCardRanking[a] - HighCardRanking[b];
  });
  return sortedHand;
};

export function isStraightFlush(hand) {
  if (isFlush(hand) && (isStraight(hand))) {
      return true;
  }
  return false;
};

export function isBomb(hand) {
  if (hand.length != 5) return false;
  var sortedHand = sortHandByRank(hand);
  var sortedHandRanks = sortedHand.map((x) => x.substring(0, x.length - 1)).map((y) => RankOrder[y]);
  if (areEqual(sortedHandRanks[0], sortedHandRanks[1], sortedHandRanks[2], sortedHandRanks[3], sortedHandRanks[4])) return false;

  if (areEqual(sortedHandRanks[0], sortedHandRanks[1], sortedHandRanks[2], sortedHandRanks[3])) {
      return true;
  } else if (areEqual(sortedHandRanks[1], sortedHandRanks[2], sortedHandRanks[3], sortedHandRanks[4])) {
      return true;
  }
  return false;
};

export function isFullHouse(hand) {
  if (hand.length != 5) return false;
  var sortedHand = sortHandByRank(hand);
  var sortedHandRanks = sortedHand.map((x) => x.substring(0, x.length - 1)).map((y) => RankOrder[y]);
  if (areEqual(sortedHandRanks[0], sortedHandRanks[1], sortedHandRanks[2], sortedHandRanks[3], sortedHandRanks[4])) return false;


  if (areEqual(sortedHandRanks[0], sortedHandRanks[1], sortedHandRanks[2]) && areEqual(sortedHandRanks[3], sortedHandRanks[4])) {
      return true;
  } else if (areEqual(sortedHandRanks[2], sortedHandRanks[3], sortedHandRanks[4]) && areEqual(sortedHandRanks[0], sortedHandRanks[1])) {
      return true;
  }
  return false;
};

export function isFlush(hand) {
  if (hand.length != 5) return false;

  let suit = hand[0].slice(-1);
  for (const card of hand) {
      if(!(card.slice(-1) == suit)) {
          return false;
      }
  }
  return true;
};

export function isStraight(hand) {
  if (hand.length != 5) return false;
  
  var sortedHand = sortHandByRank(hand);
  var lastCard = sortedHand[sortedHand.length-1];
  var sortedHandRanks = sortedHand.map((x) => x.substring(0, x.length - 1)).map((y) => RankOrder[y]);
  let rank = sortedHandRanks[0];

  if (lastCard.substring(0, lastCard.length - 1) == "2") {
      var isSixHighStraight = true;

      for (var i = 0; i < sortedHandRanks.length - 1; i++) {
          if (!(1 == (sortedHandRanks[i] - i))) { 
              isSixHighStraight = false;
          }
      }
      if (isSixHighStraight) { 
          return true;
      }
  }
  

  for (var i = 0; i < sortedHandRanks.length; i++) {
      if (!(rank == (sortedHandRanks[i] - i))) { 
          return false;
      }
  }
  return true;
};

export function getHandType(hand) {
  if (isHighCard(hand)) {
      return HandType.HighCard;
  } else if (isPair(hand)) {
      return HandType.Pair;
  } else if (isThreeOfAKind(hand)) {
      return HandType.ThreeOfAKind;
  } else if (isFourOfAKind(hand)) {
      return HandType.FourOfAKind;
  } else if (isStraightFlush(hand)) {
      return HandType.StraightFlush;
  } else if (isStraight(hand)) {
      return HandType.Straight;
  } else if (isFlush(hand)) {
      return HandType.Flush;
  } else if (isFullHouse(hand)) {
      return HandType.FullHouse;
  } else if (isBomb(hand)) {
      return HandType.Bomb;
  } else {
      return HandType.Invalid;
  }
};

export function isStronger(prevHand, currHand) {
    if (getHandType(currHand) == 1) {
        return false;
    } else if (currHand.length < 5) {
        if (!(getHandType(prevHand) == getHandType(currHand))) {
            return false;
        } else {
            if (evaluateHand(prevHand) > evaluateHand(currHand)) {
                return false;
            } 
            return true;
        }

    } else if (currHand.length == 5) {
        if (getHandType(prevHand) > getHandType(currHand)) {
            return false;
        } else if (getHandType(prevHand) < getHandType(currHand)) {
            return true;
        } else if (getHandType(prevHand) == getHandType(currHand)) {
            if (evaluateHand(prevHand) > evaluateHand(currHand)) {
                return false;
            } else {
                return true;
            }
        }
        return false;
    }
}

export function evaluateHand(hand) {
    let sortedHand = sortHandByRank(hand);
    if (isHighCard(hand)) {
        return HighCardRanking[hand[0]];
    } else if (isPair(hand)) {
        if (sortedHand[1].slice(-1) == "s") {
            return (1 + HighCardRanking[sortedHand[0]] + HighCardRanking[sortedHand[1]]);
        }
        else {
            return (HighCardRanking[sortedHand[0]] + HighCardRanking[sortedHand[1]])
        }
    } else if (isThreeOfAKind(hand) || isFourOfAKind(hand)) {
        let rank = hand[0].substring(0, hand[0].length-1);
        return RankOrder[rank];
    } else if (isStraightFlush(hand)) {
        let suit = sortedHand[0].slice(-1);
        let rank = sortedHand[3].substring(0, sortedHand[3].length - 1);
        // could enum suits and turn into one case??
        if (suit == "d") {
            return RankOrder[rank];
        } else if (suit == "c") {
            return 100 + RankOrder[rank];
        } else if (suit == "h") {
            return 200 + RankOrder[rank];
        } else if (suit == "s") {
            return 300 + RankOrder[rank];
        }
    } else if (isStraight(hand)) {
        if ((sortedHand[4].substring(0, sortedHand[4].length - 1) == 2) && (sortedHand[0].substring(0, sortedHand[0].length - 1) == 3)) {
            return HighCardRanking[sortedHand[3]];
        }
        return HighCardRanking[sortedHand[4]];
    } else if (isFlush(hand)) {
        let suit = sortedHand[0].slice(-1);
        let rank = sortedHand[4].substring(0, sortedHand[4].length - 1);
        // could enum suits and turn into one case??
        if (suit == "d") {
            return RankOrder[rank];
        } else if (suit == "c") {
            return 100 + RankOrder[rank];
        } else if (suit == "h") {
            return 200 + RankOrder[rank];
        } else if (suit == "s") {
            return 300 + RankOrder[rank];
        }
    } else if (isFullHouse(hand)) {
        let rank = sortedHand[2].substring(0, sortedHand[2].length -1);
        return RankOrder[rank];
    } else if (isBomb(hand)) {
        let rank = sortedHand[2].substring(0, sortedHand[2].length -1);
        return RankOrder[rank];
    } 
}

function isGameOver() {
    for (let hand of playerHands) {
        if (hand.size == 0) {
            console.log("GAME OVER");
            return true;
        }
    }
    return false;
}

function findNextPlayer() {
    for (var i = 0; i < playerPasses.length; i++) {
        let index = (playerTurn + 1 + i) % 4;
        if (playerPasses[index] == false) {
            return index;
        }
    }
    return playerTurn;
}

function logState() {
    console.log("Start Logging State");
    console.log("hands : ");
    for (var i = 0; i < playerHands.length; i++) {
        console.log("hand " + i + " | count : " + playerHands[i].size);
        console.log(playerHands[i].entries());
    }
    console.log("playerTurn : "  + playerTurn);
    console.log("newRound : "  + isNewRound);
    console.log("play : "  + Board);
    console.log("playerPasses : "  + playerPasses);
    console.log("gameEnd : " + isGameOver())
    console.log("End Logging State");
}

function resetRound() {
    isNewRound = true;
    playerPasses = [false, false, false, false];
    Board.push([]);
}

function isRoundComplete() {
    if (playerPasses.filter((x) => x != false).length >= 3) return true;
    return false;
}

function handlePass(playerNo) {
    if (isNewRound) return;
    if (playerNo == playerTurn) {
        playerPasses[playerNo] = true;
        playerTurn = findNextPlayer();    
    }
};

function doesHandContainsCards(hand, playedCards) {
    playedCards.forEach((card) => {
        if (!(hand.has(card))) {
            return false;
        }
    });
    return true;
}

function isPlayerTurn(playerNo) {
    if (playerNo == playerTurn) return true;
    return false;
}

function removeCardsFromHand(hand, playedCards) {
    playedCards.forEach((card) => {
        hand.delete(card);
    })
}

function handleTurn(playerNo, playedCards) {
    if (!isPlayerTurn(playerNo)) return false;

    if (!doesHandContainsCards(playerHands[playerNo], playedCards)) return false;

    if (getHandType(playedCards) == HandType.Invalid) return false;

    if (Board.length == 0 && !(playedCards.includes("3d"))) return false;

    if (!isNewRound && !isStronger(Board[Board.length - 1], playedCards)) return false;

    Board.push(playedCards);
    removeCardsFromHand(playerHands[playerNo], playedCards);
    playerTurn = findNextPlayer(playerPasses, playerTurn);
    isNewRound = false;
}

function getStartingPlayer() {
    for (let i = 0; i < 4; i++) {
        if (playerHands[i].has("3d")) {
            return i;
        }
    }
}

function DealDeck(Deck, tempHands) {
    var dealPlayer = 0;
    var tempHand0 = new Map();
    var tempHand1 = new Map();
    var tempHand2 = new Map();
    var tempHand3 = new Map();
    while (Array.from(Deck.keys()).length > 0) {
        let card = DealCard(Deck);
        dealPlayer = dealPlayer % 4;
        if (dealPlayer == 0) {
            tempHand0.set(card, 0);
        } else if (dealPlayer == 1) {
            tempHand1.set(card, 0);
        } else if (dealPlayer == 2) {
            tempHand2.set(card, 0);
        } else if (dealPlayer == 3) {
            tempHand3.set(card, 0);
        }

        dealPlayer += 1;
    }
    tempHands.push((tempHand0));
    tempHands.push((tempHand1));
    tempHands.push((tempHand2));
    tempHands.push((tempHand3));
    // return tempHands;
}

function DealCard(Deck) {
    let Cards = Array.from(Deck.keys())
    var randomNumber = Math.round((Math.random() * (Cards.length-1)))
    let Card = Cards[randomNumber]
    var currentDeck = Deck;
    currentDeck.delete(Card);
    Deck = currentDeck;
    return Card;
}

function getHandLengths() {
    var handLengths = playerHands.map((x) => x.size);
    return handLengths;
}

function sendSocketGameState(socket, playerID) {
    if (!socket) return;
    const playerNo = userIdToPlayerNo.get(playerID);
    console.log("send playerNo: " + playerNo)
    playerHands
    var data = {
        "play" : Board[Board.length - 1],
        "playerTurn" : playerTurn,
        "hands" : playerHands,
        "playerPasses":  playerPasses,
        "playerNo": playerNo
    };
    socket.send(JSON.stringify(data));
}

var deck = new Map([
    ["Ad", null],
    ["2d", null],
    ["3d", null],
    ["4d", null],
    ["5d", null],
    ["6d", null],
    ["7d", null],
    ["8d", null],
    ["9d", null],
    ["10d", null],
    ["Jd", null],
    ["Qd", null],
    ["Kd", null],
    ["Ac", null],
    ["2c", null],
    ["3c", null],
    ["4c", null],
    ["5c", null],
    ["6c", null],
    ["7c", null],
    ["8c", null],
    ["9c", null],
    ["10c", null],
    ["Jc", null],
    ["Qc", null],
    ["Kc", null],
    ["Ah", null],
    ["2h", null],
    ["3h", null],
    ["4h", null],
    ["5h", null],
    ["6h", null],
    ["7h", null],
    ["8h", null],
    ["9h", null],
    ["10h", null],
    ["Jh", null],
    ["Qh", null],
    ["Kh", null],
    ["As", null],
    ["2s", null],
    ["3s", null],
    ["4s", null],
    ["5s", null],
    ["6s", null],
    ["7s", null],
    ["8s", null],
    ["9s", null],
    ["10s", null],
    ["Js", null],
    ["Qs", null],
    ["Ks", null]
]);

var Board = [[]];
// TODO: turn this into map to track hands with playerID
var playerHands = new Array();
var userIdToPlayerNo = new Map();
var isNewRound = true;
var playerPasses = [false, false, false, false];
DealDeck(deck, playerHands);
var playerTurn = getStartingPlayer();

console.log(playerHands);


// EXPRESSSS
const app = express();
app.use(cors());
app.use(bodyParser.json())
const port = process.env.PORT || 8085;

const wss = new WebSocketServer({ noServer: true })

const server = app.listen(port, '0.0.0.0', () => {
    console.log(`App listening on port ${port}`)
})

server.on('upgrade', (request, socket, head) => {
    wss.handleUpgrade(request, socket, head, socket => {
        wss.emit('connection', socket, request)
    })
})


wss.on('connection', socket => {
    
    console.log("no clients: "  + wss.clients.size);
    socket.on('error', err => console.error('Websocket error:', err))

    socket.on('message', message => {
        console.log(message);
        const data = JSON.parse(Buffer.from(message).toString());
        console.log(data);
        socket.userData = { userId: data.message};
        console.log("userIDtoPlayerNo Size: " + userIdToPlayerNo.size);
        if (userIdToPlayerNo.has(data.message)) {
            sendSocketGameState(socket, data.message);
        }
        
        if (userIdToPlayerNo.size < 4) {
            console.log("entered")
            userIdToPlayerNo.set(data.message, userIdToPlayerNo.size);
            sendSocketGameState(socket, socket.userData.userId);

        } else {
            console.log("too many players");
        }
    })  

    socket.on('close', function close() {
        console.log("Websocket closed");
      });
})

app.get('/hands', (req, res) => {
    res.send({"hand0" :  [...playerHands[0]], "hand1" : [...playerHands[1]], "hand2" : [...playerHands[2]], "hand3" : [...playerHands[3]]});
});

app.post('/turn', (req, res) => {
    console.log("request")
    if (isGameOver()) return;

    if (req.body.hand.length == 0) {
        console.log("Pass")
        handlePass(req.body.playerNo);
    } else {
        console.log("play turn")
        handleTurn(req.body.playerNo, req.body.hand);
    }

    if (isRoundComplete()) {
        console.log("NEW ROUND");
        resetRound();
    }
    
    logState();

    console.log("SEND GAME STATE");
    wss.clients.forEach(client => {
        sendSocketGameState(client, client.userData.userId);
    })


    console.log("done")
    res.send('POST request to the homepage');
});
