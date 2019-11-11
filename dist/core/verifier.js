"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Verifier {
    //results: { [n: number]: LottoResult } = {};
    constructor(resultDownloader, resultRepository) {
        this.resultDownloader = resultDownloader;
        this.resultRepository = resultRepository;
    }
    async getResult(contest) {
        if (!(await this.resultRepository.getResult(contest))) {
            let result = await this.resultDownloader.downloadResult(contest);
            if (result) {
                this.resultRepository.addResult(result);
            }
        }
        return await this.resultRepository.getResult(contest);
    }
    async verifyGame(game) {
        try {
            this.verifyHasResult(game);
            this.verifyValidNumbers(game);
            this.verifyNumberQuantities(game);
        }
        catch (err) {
            throw err;
        }
        let quantityOfNumbersHit = 0;
        let hitNumbers = [];
        let wrongNumbers = [];
        let result = await this.getResult(game.contest);
        for (let n of game.numbers) {
            if (result.numbers.includes(n)) {
                quantityOfNumbersHit++;
                hitNumbers.push(n);
            }
            else {
                wrongNumbers.push(n);
            }
        }
        return {
            contest: result.contest,
            quantityOfHits: quantityOfNumbersHit,
            quantityOfNumbersDrawn: result.numbers.length,
            rightNumbers: hitNumbers,
            wrongNumbers
        };
    }
    async verifyGames(games) {
        let results = [];
        games.forEach(async (game) => {
            results.push(await this.verifyGame(game));
        });
        return results;
    }
    verifyValidNumbers(gameOrResult) {
        let duplicates = gameOrResult.numbers.filter((item, index) => gameOrResult.numbers.indexOf(item) != index);
        let negatives = gameOrResult.numbers.filter(n => n < 0);
        if (duplicates.length > 0) {
            throw new Error(`Invalid numbers: can't have duplicates: ${duplicates[0]}`);
        }
        if (negatives.length > 0) {
            throw new Error(`Invalid numbers: can't have nagatives: ${negatives[0]}`);
        }
    }
    async verifyNumberQuantities(game) {
        let result = await this.getResult(game.contest);
        if (game.numbers.length < result.numbers.length) {
            throw new Error(`Can't have less numbers in game (${game.numbers.length}) than in the result (${result.numbers.length})`);
        }
    }
    async verifyHasResult(game) {
        let result = await this.getResult(game.contest);
        if (!result) {
            throw new Error(`There is no result for contest ${game.contest}`);
        }
    }
}
exports.Verifier = Verifier;
