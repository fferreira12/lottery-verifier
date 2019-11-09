import { ResultRepository } from "../../core/interfaces/result-repository";
import { LottoResult } from "../../app";

export class MemoryRepository implements ResultRepository {
  
  results: { [contest: number]: LottoResult } = {};

  add(result: LottoResult): void {
    this.results[result.contest] = result;
  }  
  
  get(contest: number): LottoResult | null {
    if(this.results[contest]) {
      return this.results[contest];
    } else {
      return null;
    }
  }
}