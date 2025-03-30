export default class Player {
    private hand: string[];
    id: string;
    status: PlayerStatus;

    constructor(id: string) {
        this.hand = [];
        this.id = id;
        this.status = PlayerStatus.Waiting;
    }

    setHand(hand: string[]) {
        this.hand = hand;
    }

    getHand(): string[] {
        return this.hand;
    }

    has3d(): boolean {
        return this.hand.includes("3d");
    }

    hasCards(cards: string[]): boolean {
        cards.forEach((card) => {
            if (!(this.hand.includes(card))) {
                return false;
            }
        });
        return true;
    }

    nCardsInHand(): number {
        return this.hand.length
    }

    toHidden(): HiddenPlayer {
        return new HiddenPlayer(this.id, this.status, this.nCardsInHand())
    }

    removeCards(cards: string[]) {
        cards.forEach((card) => {
            let i = this.hand.indexOf(card);
            this.hand.splice(i, 1);
        })
    }

    giveCard(card: string) {
        this.hand.push(card);
    }
}

export class HiddenPlayer {
    hand: number;
    id: string;
    status: PlayerStatus;

    constructor(id: string, status: PlayerStatus, nCardsInHand: number) {
        this.hand = nCardsInHand;
        this.id = id;
        this.status = status;
    }
}

export enum PlayerStatus {
    Passed = "passed",
    Waiting = "waiting",
    Turn =  "turn",
}
