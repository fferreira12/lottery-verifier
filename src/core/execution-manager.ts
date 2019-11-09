import { Verifier } from "./verifier";
import { LottoGame } from "./interfaces/lotto-game";
import { LottoVerification } from "./interfaces/lotto-verification";

/**
 * The ExecutionManager takes care of managing when the verifications will occur.
 */

export class ExecutionManager {
  games: LottoGame[] = [];

  constructor(private verifier: Verifier) {}

  addGameToVerify(game: LottoGame) {
    this.games.push(game);
  }

  async startVerification(callback: (verification: LottoVerification) => void) {
    let now = new Date();
    let today9pm = new Date(
      now.getFullYear(),
      now.getMonth(),
      now.getDate(),
      21,
      0,
      0
    );

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

  async verifyAll(callback: (verification: LottoVerification) => void) {
    for (let game of this.games) {
      let verification = await this.verifier.verifyGame(game);
      callback(verification);
    }
  }
}
