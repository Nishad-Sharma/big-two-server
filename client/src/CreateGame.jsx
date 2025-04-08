import { useState } from "react";
import { baseURL } from "./Game";
import { useNavigate } from "react-router-dom";


export function CreateGame() {
    const [gameId, setGameId] = useState("");
    const [errorMsg, setErrorMsg] = useState();
    const navigate = useNavigate();

    let gameCreationStatus = () => {
        if (gameId != "") return <p>{window.location.href + "game/" + gameId}</p>
        else if (errorMsg != null) return <p>{errorMsg}</p>
        else return <p></p>
    }

    return (
        <div>
            <button onClick={() => createGameReq(setGameId, setErrorMsg, navigate)}>Create Game</button>
            <div>{gameCreationStatus()}</div>
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
