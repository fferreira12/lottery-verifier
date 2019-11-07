import { LottoResult } from "./lotto-result";

export interface ResultDownloader {
  downloadResult(contest: number): Promise<LottoResult | null>;
}