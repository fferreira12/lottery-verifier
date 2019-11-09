import { ResultRepository } from "../../core/interfaces/result-repository";
import { LottoResult } from "../../app";
export declare class MemoryRepository implements ResultRepository {
    results: {
        [contest: number]: LottoResult;
    };
    add(result: LottoResult): void;
    get(contest: number): LottoResult | null;
}
