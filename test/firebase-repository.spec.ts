import { expect } from "chai";

import { FirebaseRepository } from "../src/data/web/firebase-repository";
import { LottoGame, LottoResult } from "../src/app";

const serviceAccount = require('../config/lottery-verifier-firebase-adminsdk.json');

describe("FirebaseRepository Object", () => {

  it("should save game", async () => {

    let repo = FirebaseRepository.getInstance(serviceAccount);

    let game: LottoGame = {
      contest: 2204,
      numbers: [1, 3, 5, 7, 9, 11],
      resultDate: new Date()
    }

    await repo.addGame(game);

    expect(repo).to.be.not.null;
   
  });

  it("should get games", async () => {

    let repo = FirebaseRepository.getInstance(serviceAccount);

    let games = await repo.getGames();

    expect(games).to.be.not.null;
   
  });

  it("should save result", async () => {

    let repo = FirebaseRepository.getInstance(serviceAccount);

    let result: LottoResult = {
      contest: 2204,
      numbers: [1, 28, 29, 32, 35, 56],
      resultDate: new Date(2019, 10, 4)
    }

    await repo.addResult(result);

    expect(repo).to.be.not.null;
   
  });

  it("should get result", async () => {

    let repo = FirebaseRepository.getInstance(serviceAccount);

    let result = await repo.getResult(2204);

    expect(result).to.be.not.null;
   
  });

});
