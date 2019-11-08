import { expect } from "chai";

import { ExecutionManager } from "../src/core/execution-manager";
import { ResultRepository } from "../src/core/result-repository";
import { LottoResult } from "../src/core/lotto-result";
import { Verifier } from "../src/core/verifier";
import { LottoGame } from "../src/core/lotto-game";
import { LottoVerification } from "../src/core/lotto-verification";

describe("Execution Manager Object", () => {

  let mockDownloader = {
    downloadResult(n: number) {
      return Promise.resolve({
        contest: 1,
        numbers: [1,2,3,4,5,6],
        resultDate: new Date()
      });
    }
  }

  let mockRepository = (function() {
    let results: { [n: number]: LottoResult} = {};

    let add = (result: LottoResult) => {
      results[result.contest] = result;
    };
    
    let get = (contest: number) => {
      if(results[contest]) {
        return results[contest] as LottoResult;
      } else {
        return null;
      }
    }

    return {
      add,
      get
    }
  })() as ResultRepository;
  
  it("should verify results", async () => {

    mockRepository.add({
      contest: 2203,
      numbers: [17, 34, 46, 49, 50, 57],
      resultDate: new Date(2019,9,30)
    })

    let verifier = new Verifier(mockDownloader, mockRepository);

    let manager = new ExecutionManager(verifier);

    let game: LottoGame = {
      contest: 2203,
      numbers: [17, 34, 46, 49, 50, 57]
    }

    manager.addGameToVerify(game);

    let verifications: LottoVerification[] = []

    await manager.verifyAll((verification: LottoVerification) => {
      verifications.push(verification);
    })

    expect(manager).to.be.not.null;
    expect(verifications).to.be.not.null;
    expect(verifications.length).to.equals(1);
  });
});
