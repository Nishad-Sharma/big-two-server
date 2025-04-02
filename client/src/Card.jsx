const cards = require.context('./card_svgs', true, /\.svg$/)

const cardPaths = cards
    .keys()
    .reduce((images, path) => {
        images[path.split("/")[1].split(".")[0]] = cards(path)
        return images
    }, {})

export function Card({ value, selected = 0, Fn = () => void 0 }) {
    const cardSrc = cardPaths[value];
    if (selected === 1) {
        return (
            <img onClick={() => Fn({ value })} src={cardSrc} className="selected_card_svg"/>
        );
    } else {
        return (
            <img onClick={() => Fn({ value })} src={cardSrc} className="card_svg"/>
        );
    }
}
