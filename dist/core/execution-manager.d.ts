import { Verifier } from "./verifier";
import { LottoGame } from "./interfaces/lotto-game";
import { LottoVerification } from "./interfaces/lotto-verification";
/**
 * The ExecutionManager takes care of managing when the verifications will occur.
 */
export declare class ExecutionManager {
    private verifier;
    games: LottoGame[];
    constructor(verifier: Verifier);
    addGameToVerify(game: LottoGame): void;
    startVerification(callback: (verification: LottoVerification) => void): Promise<void>;
    verifyAll(callback: (verification: LottoVerification) => void): Promise<void>;
}
