import { LottoResult } from "./lotto-result";

export interface ResultRepository {
  addResult(result: LottoResult): void;
  getResult(contest: number): Promise<LottoResult | null>;
}