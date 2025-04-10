import club from "./assets/club1.png"
import heart from "./assets/heart1.png"
import diamond from "./assets/diamond1.png"
import spade from "./assets/spade1.png"

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
    var centerSuit;
    var miniSuit;
    if (suit == spade || suit == club) {
        textcss = "rankTextBlack";
        centerSuit = "centeredSuitBlack";
        miniSuit = "suitBlack";
    } else {
        textcss = "rankTextRed";
        centerSuit = "centeredSuitRed";
        miniSuit = "suitRed";
    }

    if (cardValue == "cardback") {
        return (
            <div className="cardc" style={{border: "1px", "border-style":"solid"}} />
        )
    }

    return (
        <div className="cardc">
            <img src={suit} className={centerSuit} ></img>
            <div className="cardTop">
                <div className={textcss}>{rank}</div>
                <img src={suit} className={miniSuit}></img>
            </div>
            <div className="cardBottom">
                <div className={textcss}>{rank}</div>
                <img src={suit} className={miniSuit}></img>
            </div>
        </div>
    )
}