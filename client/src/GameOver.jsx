import React from "react";

export function GameOver({ players, Fn }) {
    // Determine the winner by finding the player with 0 cards
    const winner = players.find(player => {
        if (Array.isArray(player.hand)) {
            return player.hand.length === 0; // If hand is an array, check its length
        }
        return player.hand === 0; // If hand is an integer, check if it's 0
    })?.id || "No winner";

    return (
        <div className="gameOver">
            <h1>Game Over</h1>
            <h2>Winner: {winner}</h2>
            <button className="menuButton" onClick={Fn}>
                Restart Game
            </button>
        </div>
    );
}