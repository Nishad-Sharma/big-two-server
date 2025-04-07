import { useState } from "react";
import { baseURL } from "./App";

export const CreateGame = () => {
    const [gameId, setGameId] = useState(null);
    const [errorMsg, setErrorMsg] = useState();

    // console.log("GRAH");
    // console.log(gameId);
    // console.log(window.location.href)
    // window.location.href = gameId;

    let gameCreationStatus = () => {
        if (gameId != null) return <p>{gameId}</p>
        else if (errorMsg != null) return <p>{errorMsg}</p>
        else return <p></p>
    }

    return (
        <div>
            <button onClick={() => createGameReq(setGameId, setErrorMsg)}>Create Game</button>
            <div>{gameCreationStatus()}</div>
        </div> 
    )
 
}

function createGameReq(setGameIdFn, setErrorFn) {
    const url = baseURL + "/createGame";
    fetch(url, {
        method: "POST",
    })
    .then(response => {
        if (response.status == 200) {
            console.log("nice!");
            response.json().then(json => setGameIdFn(window.location.href + "game/" + json.gameId));
        }
        else if (response.status == 500) {
            response.json().then(json => setErrorFn(json.error)); 
            console.log("SHIT")
        } else {
            console.log("Create game: Unexpected response from server")
        }
    });
}
