import { cardPaths } from "./App";

export function Card({ value, selected = 0, Fn = () => void 0, index, overlap = 0 }) {
    const cardSrc = cardPaths[value];
    const offset = (index * overlap) + "px";
    const css_class = (selected) ? "selected_card_svg" : "card_svg"
    return (
        <img onClick={() => Fn({ value })} src={cardSrc} className={css_class} style={{ right: offset }} />
    );
}
