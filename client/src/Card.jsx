import { VisualiseCard } from "./VisualiseCard";

export function Card({ value, selected = 0, Fn = () => void 0, position }) {
    var css_class = (selected) ? "selected_card_svg" : "card_svg"
    var offset = -75;
    if (position == "self") {
        offset = -50;
    } else if (position == "board") {
        offset = 1;
    }

    return (
        <div onClick={() => Fn({ value })} className={css_class} style={{ "--offset": offset }}>
            <VisualiseCard cardValue={value} />
        </div>
    );
}
