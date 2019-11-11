import { LottoResult } from "./interfaces/lotto-result";
import { LottoGame } from "./interfaces/lotto-game";
import { LottoVerification } from "./interfaces/lotto-verification";
import { ResultDownloader } from "./interfaces/result-downloader";
import { ResultRepository } from "./interfaces/result-repository";

export class Verifier {
  //results: { [n: number]: LottoResult } = {};

  constructor(
    private resultDownloader: ResultDownloader,
    private resultRepository: ResultRepository
  ) {}

  async getResult(contest: number) {
    if (!(await this.resultRepository.getResult(contest))) {
      let result = await this.resultDownloader.downloadResult(contest);
      if (result) {
        this.resultRepository.addResult(result);
      }
    }
    return await this.resultRepository.getResult(contest);
  }

  async verifyGame(game: LottoGame): Promise<LottoVerification> {
    try {
      this.verifyHasResult(game);
      this.verifyValidNumbers(game);
      this.verifyNumberQuantities(game);
    } catch (err) {
      throw err;
    }

    let quantityOfNumbersHit = 0;
    let hitNumbers: number[] = [];
    let wrongNumbers: number[] = [];

    let result = await this.getResult(game.contest);

    for (let n of game.numbers) {
      if (result!.numbers.includes(n)) {
        quantityOfNumbersHit++;
        hitNumbers.push(n);
      } else {
        wrongNumbers.push(n);
      }
    }

    return {
      contest: result!.contest,
      quantityOfHits: quantityOfNumbersHit,
      quantityOfNumbersDrawn: result!.numbers.length,
      rightNumbers: hitNumbers,
      wrongNumbers
    };
  }

  async verifyGames(games: LottoGame[]) {
    let results: LottoVerification[] = [];
    games.forEach(async game => {
      results.push(await this.verifyGame(game));
    });
    return results;
  }

  verifyValidNumbers(gameOrResult: LottoGame | LottoResult) {
    let duplicates = gameOrResult.numbers.filter(
      (item, index) => gameOrResult.numbers.indexOf(item) != index
    );
    let negatives = gameOrResult.numbers.filter(n => n < 0);

    if (duplicates.length > 0) {
      throw new Error(
        `Invalid numbers: can't have duplicates: ${duplicates[0]}`
      );
    }

    if (negatives.length > 0) {
      throw new Error(`Invalid numbers: can't have nagatives: ${negatives[0]}`);
    }
  }

  async verifyNumberQuantities(game: LottoGame) {
    let result = await this.getResult(game.contest);
    if (game.numbers.length < result!.numbers.length) {
      throw new Error(
        `Can't have less numbers in game (${
          game.numbers.length
        }) than in the result (${result!.numbers.length})`
      );
    }
  }

  async verifyHasResult(game: LottoGame) {
    let result = await this.getResult(game.contest);
    if (!result) {
      throw new Error(`There is no result for contest ${game.contest}`);
    }
  }
}
