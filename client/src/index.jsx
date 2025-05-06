import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { CreateGame } from "./CreateGame";
import Game from "./Game";
import "./styles.css";


export default function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<CreateGame />} />
                <Route path="/game/*" element={<Game />} />
            </Routes>
        </BrowserRouter>
    )
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);
