import React from "react";
import { LoginForm } from "./LoginForm";

export function JoinGame({ handleplayerIDSubmit, copyLink }) {
    return (
        <div className="background">
            <div className="menu">
                <p className="menuText">Enter your name:</p>
                <LoginForm handleSubmit={handleplayerIDSubmit}></LoginForm>
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
