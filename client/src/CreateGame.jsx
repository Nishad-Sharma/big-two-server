import { useState } from "react";
import { baseURL } from "./Game";
import { useNavigate } from "react-router-dom";


export function CreateGame() {
    const [gameId, setGameId] = useState("");
    const [errorMsg, setErrorMsg] = useState();
    const navigate = useNavigate();

    return (
        <div className="background">
            <h1 className="gameTitle">Big Two</h1>
            <button className="createGameButton menuButton" onClick={() => createGameReq(setGameId, setErrorMsg, navigate)}>Create Game</button>
        </div>
    )
}

function createGameReq(setGameIdFn, setErrorFn, navigate) {
    const url = baseURL + "/createGame";
    fetch(url, {
        method: "POST",
    })
        .then(response => {
            if (response.status == 200) {
                console.log("nice!");
                response.json().then(json => {
                    setGameIdFn(json.gameId)
                    const path = "game/" + json.gameId;
                    navigate(path);
                });

            }
            else if (response.status == 500) {
                response.json().then(json => setErrorFn(json.error));
            } else {
                console.log("Create game: Unexpected response from server")
            }
        });
}
