import { Card } from "./Card"
import { CardBack } from "./CardBack"

const PlayerStatusColor = Object.freeze({
    "passed": 'grey',
    "waiting": 'blue',
    "turn": 'green',
})

export function Player({ id, hand, status, Fn }) {
    var handArray;
    if (Array.isArray(hand)) {
        handArray = hand.map(card =>
            <Card key={card} value={card[0]} selected={card[1]} Fn={Fn} />
        );
    } else if (Number.isInteger(hand)) {
        let intArray = [...Array(hand).keys()]
        handArray = Array.from(intArray).map((i) =>
            <CardBack key={i} />
        );
    }

    return (
        <div>
            <p style={{ color: PlayerStatusColor[status] }}>{id + " (" + handArray.length + ")"}</p>
            <div>
                {handArray}
            </div>
            <p></p>
        </div>
    );
}