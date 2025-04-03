import { CardFan } from "./CardFan";

const PlayerStatusColor = Object.freeze({
    "passed": 'grey',
    "waiting": 'blue',
    "turn": 'green',
})

export function Player({ id, hand, status, Fn }) {
    var cardFan;
    var length;
    if (Array.isArray(hand)) {
        length = hand.length;
        cardFan = <CardFan key={id} hand={hand} Fn={Fn} overlap={40} />
    } else if (Number.isInteger(hand)) {
        length = hand;
        const cardBackArray = new Array(length).fill(["red_cardback", 0]);
        cardFan = <CardFan key={id} hand={cardBackArray} overlap={45} />
    }

    return (
        <div>
            <p style={{ color: PlayerStatusColor[status] }}>{id + " (" + length + ")"}</p>
            {cardFan}
        </div>
    );
}