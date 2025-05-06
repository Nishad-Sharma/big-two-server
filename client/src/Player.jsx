import { CardFan } from "./CardFan";

import green_triangle from "./assets/green_triangle.png";

const PlayerStatusColor = Object.freeze({
    "passed": '#e4e9f7',
    "waiting": '#354265',
    // "turn": '#7fd184',
    "turn": '#354265',
})

export function Player({ id, hand, status, Fn, position }) {
    var cardFan;
    var length;
    if (Array.isArray(hand)) {
        length = hand.length;
        cardFan = <CardFan key={id} hand={hand} Fn={Fn} position={position} />
    } else if (Number.isInteger(hand)) {
        length = hand;
        const cardBackArray = new Array(length).fill(["cardback", 0]);
        cardFan = <CardFan key={id} hand={cardBackArray} position={position} />
    }
    const css = position + "Name"

    if (status == "turn") {
        return (
            <div className={position}>
                <img src={green_triangle} className="turnIndicator"></img>
                <div className="playerName" >
                    <p className={css} style={{ color: PlayerStatusColor[status] }}>{id + " (" + length + ")"}</p>
                </div>
                {cardFan}
            </div>
        );
    } else {
        return (
            <div className={position}>
                <div className="playerName" >
                    <p className={css} style={{ color: PlayerStatusColor[status] }}>{id + " (" + length + ")"}</p>
                </div>
                {cardFan}
            </div>
        );
    }


}