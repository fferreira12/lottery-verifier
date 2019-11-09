import { LottoResult } from "./interfaces/lotto-result";
import { LottoGame } from "./interfaces/lotto-game";
import { LottoVerification } from "./interfaces/lotto-verification";
import { ResultDownloader } from "./interfaces/result-downloader";
import { ResultRepository } from "./interfaces/result-repository";
export declare class Verifier {
    private resultDownloader;
    private resultRepository;
    constructor(resultDownloader: ResultDownloader, resultRepository: ResultRepository);
    getResult(contest: number): Promise<LottoResult | null>;
    verifyGame(game: LottoGame): Promise<LottoVerification>;
    verifyGames(games: LottoGame[]): Promise<LottoVerification[]>;
    verifyValidNumbers(gameOrResult: LottoGame | LottoResult): void;
    verifyNumberQuantities(game: LottoGame): Promise<void>;
    verifyHasResult(game: LottoGame): Promise<void>;
}
