import { Card } from "./Card";

export function CardFan({ hand, Fn, position }) {
    const cards = hand.map((card, index) =>
        <Card key={index} value={card[0]} selected={card[1]} Fn={Fn} position={position}/>
    );

    const css = position + "Fan"
    return (
        <div className={css} >
            {cards}
        </div>
    )
}