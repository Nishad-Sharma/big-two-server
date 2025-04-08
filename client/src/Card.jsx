import { cardPaths } from "./Game";

export function Card({ value, selected = 0, Fn = () => void 0, position }) {
    const cardSrc = cardPaths[value];
    var css_class = (selected) ? "selected_card_svg" : "card_svg"
    var offset = -55;
    if (position == "self") {
        offset = -40;
    } else if (position == "board") {
        offset = 0;
    }

    return (
        <img onClick={() => Fn({ value })} src={cardSrc} className={css_class} style={{"--offset": offset}} />
    );
}
