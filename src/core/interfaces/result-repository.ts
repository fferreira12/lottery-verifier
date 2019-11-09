import { LottoResult } from "./lotto-result";

export interface ResultRepository {
  add(result: LottoResult): void;
  get(contest: number): Promise<LottoResult | null>;
}