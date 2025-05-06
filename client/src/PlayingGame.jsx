import React from "react";
import { Player } from "./Player";
import { Board } from "./Board";

export function PlayingGame({ players, playerID, playerLayout, SelectCard, sortHand, sendTurn, board }) {
    const connectedPlayers = [];
    const position = players.findIndex(player => player.id === playerID);

    for (let i = 0; i < players.length; i++) {
        const player = players[(i + position + 1) % players.length];
        connectedPlayers.push(
            <Player
                key={player.id}
                id={player.id}
                hand={player.hand}
                status={player.status}
                Fn={SelectCard}
                position={playerLayout[i]}
            />
        );
    }

    return (
        <div className="background">
            <div className="gameContainer">
                <div className="sortButton">
                    <button className="menuButton" onClick={sortHand}>
                        Sort
                    </button>
                </div>
                <div className="actionButton">
                    <button className="menuButton" onClick={() => sendTurn(false)}>
                        Play
                    </button>
                    <button
                        className="menuButton"
                        style={{ marginLeft: "2px" }}
                        onClick={() => sendTurn(true)}
                    >
                        Pass
                    </button>
                </div>
                {connectedPlayers}
                <Board hand={board} name="Board" />
            </div>
        </div>
    );
}