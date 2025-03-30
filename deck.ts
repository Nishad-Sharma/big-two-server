export default class Deck {
    private cards: Map<string, null>;

    constructor() {
        this.cards = new Map([
            ["Ad", null],
            ["2d", null],
            ["3d", null],
            ["4d", null],
            ["5d", null],
            ["6d", null],
            ["7d", null],
            ["8d", null],
            ["9d", null],
            ["10d", null],
            ["Jd", null],
            ["Qd", null],
            ["Kd", null],
            ["Ac", null],
            ["2c", null],
            ["3c", null],
            ["4c", null],
            ["5c", null],
            ["6c", null],
            ["7c", null],
            ["8c", null],
            ["9c", null],
            ["10c", null],
            ["Jc", null],
            ["Qc", null],
            ["Kc", null],
            ["Ah", null],
            ["2h", null],
            ["3h", null],
            ["4h", null],
            ["5h", null],
            ["6h", null],
            ["7h", null],
            ["8h", null],
            ["9h", null],
            ["10h", null],
            ["Jh", null],
            ["Qh", null],
            ["Kh", null],
            ["As", null],
            ["2s", null],
            ["3s", null],
            ["4s", null],
            ["5s", null],
            ["6s", null],
            ["7s", null],
            ["8s", null],
            ["9s", null],
            ["10s", null],
            ["Js", null],
            ["Qs", null],
            ["Ks", null]
        ]);


    }

    dealCard(): string {
        let cards = Array.from(this.cards.keys())
        var randomNumber = Math.round((Math.random() * (cards.length - 1)))
        let card = cards[randomNumber]
        this.cards.delete(card);
        return card;
    }

    undealtCardsRemaining(): number {
        return this.cards.size
    }
}