import Player, { PlayerStatus } from "./player.ts";
import Deck from "./deck.ts";
import { HandType, getHandType, isStronger } from "./evaluation.ts";

export default class Game {
    id: string;
    board: string[];
    players: Player[];
    isNewRound: boolean;
    status: GameStatus;

    constructor(id: string) {
        this.id = id;
        this.board = [];
        this.players = [];
        this.isNewRound = true;
        this.status = GameStatus.Lobby;
    }

    resetGame() {
        this.board = [];
        this.isNewRound = true;
        for (var player of this.players) {
            player.setStatus(PlayerStatus.Waiting);
            player.setHand([]);
        }
    }

    isExistingPlayer(playerID: string) {
        var player = this.players.find((player) => player.id == playerID); // is this reference? or copy check
        if (player) return true;
        return false;
    }

    removePlayer(playerID: string) {
        const player = this.getPlayer(playerID);
        if (player) {
            const index = this.players.indexOf(player);
            this.players.splice(index, 1);
            return true;
        }
        return false;
    }

    addPlayer(playerID: string) {
        if (this.players.length >= 4) return false;
        var newPlayer = new Player(playerID);
        this.players.push(newPlayer);
        if (this.players.length == 4) {
            this.deal();
        }
        return true;
    }

    deal() {
        if (this.status == GameStatus.Playing) return;
        var deck = new Deck();
        if (this.players.length != 4) {
            console.log("Lobby does not have 4 players! player count: " + this.players.length);
            return false
        }
        while (deck.undealtCardsRemaining() > 0) {
            this.players.forEach(p => p.giveCard(deck.dealCard()));
        }
        this.players.forEach(player => {
            if (player.has3d()) {
                player.status = PlayerStatus.Turn;
            }
        })
        this.status = GameStatus.Playing;
        return true;
    }

    getGameStateForPlayer(id: string) {
        let players = this.players.map(p => {
            if (p.id == id) {
                return p;
            } else {
                return p.toHidden();
            }
        })

        return {
            "board": this.board,
            "players": players,
            "isNewRound": this.isNewRound,
            "status": this.status,
        };
    }

    getGameState() {
        return {
            "id": this.id,
            "board": this.board,
            "players": this.players,
            "isNewRound": this.isNewRound,
            "status": this.status,
        };
    }


    executeTurn(id: string, cards: string[]): boolean {
        if (this.status != GameStatus.Playing) return false;

        let player = this.getPlayer(id);
        if (player == undefined) return false;

        if (player.status != PlayerStatus.Turn) return false;

        if (cards.length == 0) {
            if (this.isNewRound) return false;
            player.status = PlayerStatus.Passed;

        } else {
            if (!player.hasCards(cards)) return false;
            if (getHandType(cards) == HandType.Invalid) return false;
            if (!this.isNewRound && !isStronger(this.board, cards)) return false;

            player.status = PlayerStatus.Waiting;
            this.isNewRound = false;
            player.removeCards(cards);
            // Check if 4th and 5th card are 6 and 2 respectively, if so, move 2 to the front of card array
            if (cards.length == 5 && cards[3].slice(0, -1) == "6" && cards[4].slice(0, -1) == "2") {
                const lastElement = cards.pop();
                if (lastElement !== undefined) {
                    cards.unshift(lastElement);
                }
            }

            this.board = cards;
        }

        if (this.isGameOver()) {
            this.status = GameStatus.Complete;
            console.log("GAME OVER");
            return true;
        }

        if (this.isRoundComplete()) {
            this.isNewRound = true;
            this.players.forEach((player, index) => {
                if (player.status == PlayerStatus.Waiting) {
                    this.players[index].status = PlayerStatus.Turn;
                } else if (player.status == PlayerStatus.Passed) {
                    this.players[index].status = PlayerStatus.Waiting;
                } else {
                    console.log("ERROR: invalid player status: ");
                    console.log(player);
                }
            })
            this.board = [];
        } else {
            var n = this.nextPlayer(player);
            for (let i = 0; i < this.players.length - 1; i++) {
                if (n.status == PlayerStatus.Waiting) {
                    n.status = PlayerStatus.Turn
                    break;
                } else {
                    n = this.nextPlayer(n);
                }
            }
        }

        return true;
    }

    //todo: figure out error/return type
    private getPlayer(id: string): Player | undefined {
        return this.players.find(p => p.id == id);
    }

    private nextPlayer(player: Player): Player {
        var i = this.players.indexOf(player);
        if (i == -1) console.log("Could not find next player, invalid player: " + player.id);
        if (i == 3) {
            return this.players[0];
        } else {
            return this.players[i + 1];
        }
    }

    private isRoundComplete() {
        return this.players.filter((x) => x.status == PlayerStatus.Passed).length >= 3
    }

    private isGameOver(): boolean {
        for (let player of this.players) {
            if (player.nCardsInHand() == 0) {
                return true;
            }
        }
        return false;
    }
}

export enum GameStatus {
    Lobby,
    Playing,
    Complete,
}
