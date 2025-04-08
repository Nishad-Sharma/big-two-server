import { CardFan } from "./CardFan";

const PlayerStatusColor = Object.freeze({
    "passed": 'grey',
    "waiting": 'blue',
    "turn": 'green',
})

export function Player({ id, hand, status, Fn, position}) {
    var cardFan;
    var length;
    if (Array.isArray(hand)) {
        length = hand.length;
        cardFan = <CardFan key={id} hand={hand} Fn={Fn} position={position} />
    } else if (Number.isInteger(hand)) {
        length = hand;
        const cardBackArray = new Array(length).fill(["cardback", 0]);
        cardFan = <CardFan key={id} hand={cardBackArray} position={position}/>
    }
    const css = position + "Name"

    return (
        <div className={position}>
            <p className={css} style={{ color: PlayerStatusColor[status] }}>{id + " (" + length + ")"}</p>
            {cardFan}
        </div>
    );
}