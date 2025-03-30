import Game from "./game.ts";

export default class GameRegistry {
    games: Game[];

    constructor() {
        this.games = []; // maybe should be map to easily access gameid
    }

    createGame(id: string) {
        var game = new Game(id); // GameID will probably be a random generated string later and you check if string already exists?
        this.games.push(game);
        console.log("Creating game");
        console.log(this.games);
    }

    getGame(id: string): Game | undefined {
        var game = this.games.find((game) => game.id == id);
        return game;
    }
}