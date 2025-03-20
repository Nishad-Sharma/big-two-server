import { useState } from 'react';

const HighCardRanking = Object.freeze({
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

const SuitValue = Object.freeze({
  "d" : 0,
  "c" : 100,
  "h" : 200,
  "s" : 300
});

function CountSelected(hand) {
    return Array.from(hand.values()).filter((x) => x == 1).length;   
};

function sortHandByRank(hand) {
    const handArrays = Array.from(hand.keys());
    const sortedHandArray = handArrays.sort((a,b) => {
        return HighCardRanking[a] - HighCardRanking[b];
    });   
  
    var sortedHandMap = new Map();
    sortedHandArray.map((x) => {
        sortedHandMap.set(x, hand.get(x));
    })
  
    return sortedHandMap;
};

function sortHandBySuit(hand) {
    const handArrays = Array.from(hand.keys());
    const sortedHandArray = handArrays.sort((a,b) => {
        return (HighCardRanking[a] + SuitValue[a.slice(-1)]) - (HighCardRanking[b] + SuitValue[b.slice(-1)]);
    });   

    var sortedHandMap = new Map();
    sortedHandArray.map((x) => {
        sortedHandMap.set(x, hand.get(x));
    })

    return sortedHandMap;
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

function Card({value, selected=0, Fn}) {
    if (selected === 1) {
        return (
            <button onClick={() => Fn({value})} className="card">
                <u>{value}</u>
            </button>
        );
    } else {
        return (
            <button onClick={() => Fn({value})} className="card">
                {value}
            </button>
        );
    }
}

function CardBack() {
    return (
        <button className='card_back'></button>
    );
}

function Play({hand, name}) {
    if (hand.length < 1) {
        return (
        <div>
            <br/>
            <p>{name}</p>
            <div></div>
            <p></p>
        </div>
        );
    } else {
        const handArray = Array.from(hand).map(card =>
            <Card key={card} value={card}/>
        );
        
        return (
            <div>
                <br/>
                <p>{name}</p>
                <div>{handArray}</div>
                <p></p>
            </div>
            );
    }
}

function OpponentHand({name, handLength, currentPlayer, playerPasses}) {
    if (handLength == 0) {
        return (
            <div>
                <br/>
                <p>{name}</p>
            </div>
        );
    } else if (playerPasses[Number(name.slice(-1))]) {
        let intArray = Array.from({length: handLength}, (v, i) => i);
        const handArray = Array.from(intArray).map((i) => 
            <CardBack key={i}/>
        );

        return (
            <div>
                <br/>
                <p style={{ color : 'grey' }}>{name  + " (" + handLength + ")"}</p>
                <div>
                    {handArray}
                </div>
                <p></p>
            </div>
        ); 
    } else if (name.slice(-1) == currentPlayer) {
        let intArray = Array.from({length: handLength}, (v, i) => i);
        const handArray = Array.from(intArray).map((i) => 
            <CardBack key={i}/>
        );
        
        return (
            <div>
                <br/>
                <p><u>{name  + " (" + handLength + ")"}</u></p>
                <div>
                    {handArray}
                </div>
                <p></p>
            </div>
        );   
    } else {
        let intArray = Array.from({length: handLength}, (v, i) => i);
        const handArray = Array.from(intArray).map((i) => 
            <CardBack key={i}/>
        );
        return (
            <div>
                <br/>
                <p style={{ color : 'blue' }}>{name + " (" + handLength + ")"}</p>
                <div>
                    {handArray}
                </div>
                <p></p>
            </div>
        );
    }
}

function Hand({hand, Fn, name, currentPlayer}) {
    if (!hand) {
        return (
            <div>
                <br/>
                <p>{name}</p>
            </div>
        );
    } else if (name.slice(-1) == currentPlayer) {
        const handArray = Array.from(hand.keys()).map(card => 
            <Card key={card} selected={hand.get(card)} value={card} Fn={Fn}/>
        );

        return (
            <div>
                <br/>
                <p><u>{name}</u></p>
                <div>{handArray}</div>
                <p></p>
            </div>
        );

    } else {
        const handArray = Array.from(hand.keys()).map(card => 
            <Card key={card} selected={hand.get(card)} value={card} Fn={Fn}/>
        );
    
        return (
            <div>
                <br/>
                <p>{name}</p>
                <div>{handArray}</div>
                <p></p>
            </div>
            );
    }
}

export default function Game() {
    const [hand, setHand] = useState(new Map());
    const [play, setPlay] = useState(new Array());
    const [playerTurn, setPlayerTurn] = useState(0);
    //this probs doesnt have to be state
    const [playerNo, setPlayerNo] = useState(Number(window.location.pathname.substring(1)));
    const [playerPasses, setPlayerPasses] = useState(new Array(false, false, false, false));
    const [handLengths, setHandLengths] = useState(new Array(0, 0, 0, 0));

    function sortHand(hand) {
        if (areArraysEqual(Array.from(sortHandByRank(hand).keys()), Array.from(hand.keys()))) {
            setHand(sortHandBySuit(hand));
        } else {
            setHand(sortHandByRank(hand));
        }
    }

    function sendTurn(isPass) {
        if (CountSelected(hand) == 0 && !isPass) return;
        var turnArray = new Array();
        hand.forEach((value, key) => {
            if (value === 1) {
                turnArray.push(key);
            }
        })

        const url = "http://localhost:3005/turn";
        const payload = {playerNo: playerNo, hand: turnArray};
        if (isPass) payload['hand'] = []

        const response = fetch(url, {
            method : "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(payload)
        })

    }

    function SelectCard(card) {
        const currentHand = new Map([...hand]);
        if (currentHand.get(card.value) == 0) {
            if (CountSelected(currentHand) < 5) {
                currentHand.set(card.value, 1);
            }
        } else {
            currentHand.set(card.value, 0);
        }
        setHand(currentHand);
    };

    function http() {
        const okUrl = "http://localhost:3005/" + playerNo;

        fetch(okUrl)
        .then((response) => {
          console.log(response);
          return response;
        })
        .then((response) => response.json())
        .then((data) => {
          console.log(data);
          setPlayerTurn(data.playerTurn);
          setHandLengths(data.handLengths);
          setHand(new Map(data.hand));
          setPlayerPasses(data.playerPasses);
          setPlay(data.play);
        });
        
    }

    var playerLengths = new Map();
    for (var i = 0; i < handLengths.length - 1; i++) {
        let index = (playerNo + 1 + i) % 4;
        playerLengths.set(index, handLengths[index]);
    } 

    const OpponentHands = []
    playerLengths.forEach((value, key) => {
        OpponentHands.push(<div key={key}><OpponentHand name={"Player " + key} handLength={value} currentPlayer={playerTurn} playerPasses={playerPasses}/><br/></div>);
    })

    return (
        <div>
        <div>
            <button onClick={() => http(playerTurn)}>
                HTTP
            </button>
            <button onClick={() => sendTurn(false)}>
                Play
            </button>
            <button onClick={() => sendTurn(true)}>
                Pass
            </button>
            <button onClick={() => sortHand(hand)}>
                Sort
            </button>
            <br/>
            {OpponentHands}
            <Hand hand={hand} Fn={SelectCard} name={"Player " + playerNo} currentPlayer={playerTurn} className="hand"/>
            <br/>
            <Play hand={play} name="Play"/>
        </div>
        </div>
    );
}
