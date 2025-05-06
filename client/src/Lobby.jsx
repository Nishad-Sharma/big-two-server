import React from "react";

export function Lobby({ players, copyLink }) {
    const connectedPlayers = players.map(player => (
        <div className="connectedText" key={player.id}>
            {player.id}
            <br />
        </div>
    ));

    return (
        <div className="background">
            <div className="menu">
                <h1 className="menuText">Waiting for 4 players...</h1>
                <h2 className="menuText">Joined:</h2>
                {connectedPlayers}
                <br />
                <p className="menuText">Share game link:</p>
                <div className="menuText">
                    <a href={window.location.href} id="link"></a>
                    <button className="menuButton" onClick={copyLink}>Copy link</button>
                </div>
            </div>
        </div>
    );
}