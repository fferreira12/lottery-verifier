import { expect } from "chai";

import { Verifier } from "../src/core/verifier";

describe("Verifier Object", () => {

  let mockDownloader = {
    downloadResult(n: number) {
      return Promise.resolve({
        contest: 1,
        numbers: [1,2,3,4,5,6],
        resultDate: new Date()
      });
    }
  }

  it("should get result of winner", async () => {
    let numbers = [1, 2, 3, 4, 5, 6];



    let verifier = new Verifier(mockDownloader);

    let result = await verifier.verifyGame({
      contest: 1,
      numbers: [1, 2, 3, 4, 5, 6],
      resultDate: new Date()
    });

    expect(result).to.be.not.null;
    expect(result.quantityOfHits).to.equal(6);
    expect(result.quantityOfNumbersDrawn).to.equal(6);
    expect(result.rightNumbers.length).to.equal(6);
    expect(result.wrongNumbers.length).to.equal(0);
  });

  it("should get result of loser", async () => {
    let numbers = [1, 2, 3, 4, 5, 6];

    let verifier = new Verifier(mockDownloader);

    let result = await verifier.verifyGame({
      contest: 1,
      numbers: [7, 8, 9, 10, 11, 12],
      resultDate: new Date()
    });

    expect(result).to.be.not.null;
    expect(result.quantityOfHits).to.equal(0);
    expect(result.quantityOfNumbersDrawn).to.equal(6);
    expect(result.rightNumbers.length).to.equal(0);
    expect(result.wrongNumbers.length).to.equal(6);
  });

  it("should get result of wins/losses", async () => {
    let numbers = [1, 2, 3, 4, 5, 6];

    let verifier = new Verifier(mockDownloader);

    let result = await verifier.verifyGame({
      contest: 1,
      numbers: [1, 2, 3, 10, 11, 12],
      resultDate: new Date()
    });

    expect(result).to.be.not.null;
    expect(result.quantityOfHits).to.equal(3);
    expect(result.quantityOfNumbersDrawn).to.equal(6);
    expect(result.rightNumbers.length).to.equal(3);
    expect(result.wrongNumbers.length).to.equal(3);
  });

  it("should refuse different contests", async () => {
    let numbers = [1, 2, 3, 4, 5, 6];

    let verifier = new Verifier(mockDownloader);

    let trial = () => {
      verifier.verifyGame({
        contest: 2,
        numbers: [1, 2, 3, 10, 11, 12],
        resultDate: new Date()
      });
    };

    expect(trial).to.throw
  });

  it("should refuse number inconsistency", () => {
    let numbers = [1, 2, 3, 4, 5, 6];

    let verifier = new Verifier(mockDownloader);

    let trial = () => {
      verifier.verifyGame({
        contest: 2,
        numbers: [1, 2, 3, 10, 11],
        resultDate: new Date()
      });
    };

    expect(trial).to.throw
  });

  it("should refuse negative numbers", () => {
    let numbers = [1, 2, 3, 4, 5, 6];

    let verifier = new Verifier(mockDownloader);

    let trial = () => {
      verifier.verifyGame({
        contest: 2,
        numbers: [1, 2, 3, 10, -11],
        resultDate: new Date()
      });
    };

    expect(trial).to.throw
  });
});
