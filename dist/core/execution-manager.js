"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * The ExecutionManager takes care of managing when the verifications will occur.
 */
class ExecutionManager {
    constructor(verifier, gamesRepo) {
        this.verifier = verifier;
        this.gamesRepo = gamesRepo;
        this.games = [];
        this.initializeData();
    }
    async initializeData() {
        let games = await this.gamesRepo.getGames();
        if (games) {
            this.games = games;
        }
    }
    addGameToVerify(game) {
        this.games.push(game);
        this.gamesRepo.addGame(game);
    }
    //DEPRECATED
    async startVerification(callback) {
        let now = new Date();
        let today9pm = new Date(now.getFullYear(), now.getMonth(), now.getDate(), 21, 0, 0);
        let msToTodayAt9pm = today9pm.getTime() - now.getTime();
        let fnToCall = () => {
            console.log("First 9pm verification in progress");
            this.verifyAll(callback);
            console.log("Awaiting next verifications");
            setInterval(() => {
                console.log("9pm verification in progress");
                this.verifyAll(callback);
            }, 24 * 60 * 60 * 1000);
        };
        console.log("First verification");
        this.verifyAll(callback);
        setTimeout(fnToCall, msToTodayAt9pm);
    }
    async verifyAll(callback) {
        await this.initializeData();
        for (let game of this.games) {
            let verification = await this.verifier.verifyGame(game);
            callback(verification);
        }
        return;
    }
}
exports.ExecutionManager = ExecutionManager;
