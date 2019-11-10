import { Verifier } from "./verifier";
import { LottoGame } from "./interfaces/lotto-game";
import { LottoVerification } from "./interfaces/lotto-verification";
import { GameRepository } from "./interfaces/game-repository";
/**
 * The ExecutionManager takes care of managing when the verifications will occur.
 */
export declare class ExecutionManager {
    private verifier;
    private gamesRepo;
    games: LottoGame[];
    constructor(verifier: Verifier, gamesRepo: GameRepository);
    initializeData(): Promise<void>;
    addGameToVerify(game: LottoGame): void;
    startVerification(callback: (verification: LottoVerification) => void): Promise<void>;
    verifyAll(callback: (verification: LottoVerification) => void): Promise<void>;
}
