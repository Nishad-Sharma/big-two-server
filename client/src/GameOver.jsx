export function GameOver({ winner, Fn }) {
    return (
        <div className="gameOver">
            <h1>Game Over</h1>
            <h2>{winner} wins!</h2>
            <button className="menuButton" onClick={() => { Fn() }}>Play Again</button>
        </div>
    );
}