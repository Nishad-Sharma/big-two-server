import { randomUUID } from "crypto";
import Game from "./game.ts";
import {err, ok} from "./result.ts"

export default class GameRegistry {
    games: Game[];
    maxGames: number; 

    constructor() {
        this.games = []; // maybe should be map to easily access gameid
        this.maxGames = 500;
    }

    createGame(): Result<string> {
        return this.createGameWithId(randomUUID())
    }

    createGameWithId(id: string): Result<string> {
        if (this.games.length >= this.maxGames) return err("Could not create game, server is full") 
        var game = new Game(id); // GameID will probably be a random generated string later and you check if string already exists?
        this.games.push(game);
        console.log("Creating game");
        console.log(this.games);
        return ok(id.toString());
    }

    getGame(id: string): Game | undefined {
        var game = this.games.find((game) => game.id == id);
        return game;
    }
}