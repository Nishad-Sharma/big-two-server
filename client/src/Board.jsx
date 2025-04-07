import { CardFan } from "./CardFan";

export function Board({ hand, name }) {
    const cardArray = hand.map(card =>
        [card, 0]
    );
    const cardFan = <CardFan key={name} hand={cardArray} position="board"/>

    return (
        <div className="board">
            <div>{cardFan}</div>
            <p></p>
        </div>
    );
}
