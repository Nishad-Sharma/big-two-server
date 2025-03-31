import { useState } from "react";
import { baseURL } from "./App";

export const CreateGame = () => {
    const [gameId, setGameId] = useState(null);
    const [errorMsg, setErrorMsg] = useState();

    let gameCreationStatus = () => {
        if (gameId != null) return <p>{gameId}</p>
        else if (errorMsg != null) return <p>{errorMsg}</p>
        else return <p></p>
    }

    return (
        <div className="App">
            <button onClick={() => createGameReq(setGameId, setErrorMsg)}>Create Game</button>
            <div>{gameCreationStatus()}</div>
        </div> 
    )
 
}

function createGameReq(setGameIdFn, setErrorFn) {
    const url = baseURL + "/game";
    fetch(url, {
        method: "POST",
    })
    .then(response => {
        if (response.status == 200) {
            console.log("nice!");
            response.json().then(json => setGameIdFn(baseURL + "/game/" + json.gameId));
        }
        else if (response.status == 500) {
            response.json().then(json => setErrorFn(json.error)); 
        } else {
            console.log("Create game: Unexpected response from server")
        }
    });
}
