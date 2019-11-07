import { LottoResult } from "./lotto-result";
import { LottoGame } from "./lotto-game";
import { LottoVerification } from "./lotto-verification";
import { ResultDownloader } from "./contest-downloader";
export declare class Verifier {
    private resultDownloader;
    results: {
        [n: number]: LottoResult;
    };
    constructor(resultDownloader: ResultDownloader);
    getResult(contest: number): Promise<LottoResult>;
    verifyGame(game: LottoGame): Promise<LottoVerification>;
    verifyGames(games: LottoGame[]): Promise<LottoVerification[]>;
    verifyValidNumbers(gameOrResult: LottoGame | LottoResult): void;
    verifyNumberQuantities(game: LottoGame): Promise<void>;
}
