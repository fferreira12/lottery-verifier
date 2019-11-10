import { ResultRepository } from "../../core/interfaces/result-repository";
import { LottoResult } from "../../app";
export declare class MemoryRepository implements ResultRepository {
    results: {
        [contest: number]: LottoResult;
    };
    addResult(result: LottoResult): void;
    getResult(contest: number): Promise<LottoResult | null>;
}
