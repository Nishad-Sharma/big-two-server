import { Card } from "./Card"

export function Board({ hand, name }) {
    const handArray = Array.from(hand).map(card =>
        <Card key={card} value={card} />
    );

    return (
        <div>
            <br />
            <p>{name}</p>
            <div>{handArray}</div>
            <p></p>
        </div>
    );
}
