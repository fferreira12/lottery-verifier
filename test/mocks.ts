import { LottoResult } from "../src/core/interfaces/lotto-result";
import { ResultRepository } from "../src/core/interfaces/result-repository";
import { LottoGame } from "../src/core/interfaces/lotto-game";
import { GameRepository } from "../src/core/interfaces/game-repository";

let mockDownloader = {
  downloadResult(n: number) {
    return Promise.resolve({
      contest: 1,
      numbers: [1, 2, 3, 4, 5, 6],
      resultDate: new Date()
    });
  }
};

let mockResultRepository = (function() {
  let results: { [n: number]: LottoResult } = {};

  let addResult = (result: LottoResult) => {
    results[result.contest] = result;
  };

  let getResult = (contest: number) => {
    if (results[contest]) {
      return new Promise((resolve, reject) => {
        resolve(results[contest] as LottoResult);
      });
    } else {
      return new Promise((resolve, reject) => {
        resolve(null);
      });
    }
  };

  return {
    addResult,
    getResult
  };
})() as ResultRepository;

let mockGameRepository = (function() {
  let games: LottoGame[] = [];

  let addGame = (game: LottoGame) => {
    games.push(game);
  };

  let getGames = () => {
    return new Promise((resolve, reject) => {
      resolve(games as LottoGame[]);
    });
  };

  return {
    addGame,
    getGames
  };
})() as GameRepository;

export {
  mockDownloader, mockResultRepository, mockGameRepository
}