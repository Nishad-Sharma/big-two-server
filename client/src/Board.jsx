import { CardFan } from "./CardFan";

export function Board({ hand, name }) {
    const cardArray = hand.map(card =>
        [card, 0]
    );
    const cardFan = <CardFan key={name} hand={cardArray} overlap={0} />

    return (
        <div>
            <p>{name}</p>
            <div>{cardFan}</div>
            <p></p>
        </div>
    );
}
