import club from "./assets/club.png"
import heart from "./assets/heart.png"
import diamond from "./assets/diamond.png"
import spade from "./assets/spade.png"
import cardFront from "./assets/card_front.png"
import cardBack from "./assets/card_back.png"

export function VisualiseCard() {
    return (
        <div className="cardContainer">
            <img src={cardFront} className="cardFace"></img>
            <img src={spade} className="centeredSuit"></img>
            <div className="cardTop">
                <div className="rankTextBlack">A</div>
                <img src={spade} className="suit"></img>
            </div>
            <div class="cardBottom">
                <div class="rankTextBlack">A</div>
                <img src={spade} className="suit"></img>
            </div>
        </div>
    )
}