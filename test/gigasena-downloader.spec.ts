import { expect } from "chai";

import { GigasenaDownloader } from "../src/data/web/gigasena-downloader";

describe("GigasenaDownloader Object", () => {

  it("should get result", async () => {

    let downloader = new GigasenaDownloader();

    let result = await downloader.downloadResult(2203)

    expect(result.contest).to.equals(2203);
    expect(result.numbers[0]).to.equals(17);
    expect(result.numbers[1]).to.equals(34);
    expect(result.numbers[2]).to.equals(46);
    expect(result.numbers[3]).to.equals(49);
    expect(result.numbers[4]).to.equals(50);
    expect(result.numbers[5]).to.equals(57);
    expect(result.resultDate.getDate()).to.equals(30);
    expect(result.resultDate.getMonth()).to.equals(10-1);
    expect(result.resultDate.getFullYear()).to.equals(2019);
  });
});
