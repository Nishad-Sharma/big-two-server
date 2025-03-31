export function Card({ value, selected = 0, Fn = () => void 0 }) {
    if (selected === 1) {
        return (
            <button onClick={() => Fn({value})} className="card">
                <u>{value}</u>
            </button>
        );
    } else {
        return (
            <button onClick={() => Fn({value})} className="card">
                {value}
            </button>
        );
    }
}
