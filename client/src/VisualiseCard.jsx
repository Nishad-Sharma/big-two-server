import club from "./assets/club.png"
import heart from "./assets/heart.png"
import diamond from "./assets/diamond.png"
import spade from "./assets/spade.png"
import cardFront from "./assets/card_front.png"
import cardBack from "./assets/card_back.png"

const SuitName = Object.freeze({
    "s": spade,
    "c": club,
    "d": diamond,
    "h": heart
})


export function VisualiseCard({ cardValue }) {
    var rank = cardValue.substring(0, cardValue.length - 1);
    if (rank == "a" || rank == "j" || rank == "q" || rank == "k") {
        rank = rank.toUpperCase();
    }
    const suit = SuitName[cardValue.slice(-1)];
    var textcss;
    if (suit == spade || suit == club) {
        textcss = "rankTextBlack";
    } else {
        textcss = "rankTextRed";
    }

    if (cardValue == "cardback") {
        return (
            <div className="cardContainer">
                <img src={cardBack} className="cardFace"></img>
            </div>
        )
    }

    return (
        <div className="cardContainer">
            <img src={cardFront} className="cardFace"></img>
            <img src={suit} className="centeredSuit"></img>
            <div className="cardTop">
                <div className={textcss}>{rank}</div>
                <img src={suit} className="suit"></img>
            </div>
            <div className="cardBottom">
                <div className={textcss}>{rank}</div>
                <img src={suit} className="suit"></img>
            </div>
        </div>
    )
}