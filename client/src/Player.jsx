import { CardFan } from "./CardFan";

const PlayerStatusColor = Object.freeze({
    "passed": '#e4e9f7',
    "waiting": '#354265',
    "turn": '#7fd184',
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
            <button className="playerName" >
                <p className={css} style={{ color: PlayerStatusColor[status] }}>{id + " (" + length + ")"}</p>
            </button>
            {cardFan}
        </div>
    );
}