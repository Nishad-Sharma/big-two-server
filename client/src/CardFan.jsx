import { Card } from "./Card";

export function CardFan({ hand, Fn, overlap = 0 }) {
    const cards = hand.map((card, index) =>
        <Card key={index} value={card[0]} selected={card[1]} Fn={Fn} index={index} overlap={overlap} />
    );

    return (
        <div>
            {cards}
        </div>
    )
}