import { expect } from "chai";

import { App } from "../src/app";

describe("Application Object", () => {
  it("should be created", () => {
    let app = new App();
    expect(app).to.be.not.null;
  });
});
