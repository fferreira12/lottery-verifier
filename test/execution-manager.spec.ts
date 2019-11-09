import { expect } from "chai";

import { ExecutionManager } from "../src/core/execution-manager";
import { Verifier } from "../src/core/verifier";
import { LottoGame } from "../src/core/interfaces/lotto-game";
import { LottoVerification } from "../src/core/interfaces/lotto-verification";

import { mockResultRepository, mockDownloader, mockGameRepository } from './mocks'

describe("Execution Manager Object", () => {
  

  it("should verify results", async () => {
    mockResultRepository.addResult({
      contest: 2203,
      numbers: [17, 34, 46, 49, 50, 57],
      resultDate: new Date(2019, 9, 30)
    });

    let verifier = new Verifier(mockDownloader, mockResultRepository);

    let manager = new ExecutionManager(verifier, mockGameRepository);

    let game: LottoGame = {
      contest: 1,
      numbers: [17, 34, 46, 49, 50, 57]
    };
    let game2: LottoGame = {
      contest: 1,
      numbers: [16, 35, 47, 51, 53, 58]
    };

    manager.addGameToVerify(game);
    manager.addGameToVerify(game2);

    let verifications: LottoVerification[] = [];

    await manager.verifyAll((verification: LottoVerification) => {
      verifications.push(verification);
    });

    expect(manager).to.be.not.null;
    expect(verifications).to.be.not.null;
    expect(verifications.length).to.equals(2);
  });
});
