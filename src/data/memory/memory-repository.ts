import { ResultRepository } from "../../core/interfaces/result-repository";
import { LottoResult } from "../../app";

export class MemoryRepository implements ResultRepository {
  
  results: { [contest: number]: LottoResult } = {};

  add(result: LottoResult): void {
    this.results[result.contest] = result;
  }  
  
  async get(contest: number): Promise<LottoResult | null> {
    if(this.results[contest]) {
      return new Promise((resolve, reject) => {
        resolve(this.results[contest])
      });
    } else {
      return new Promise((resolve, reject) => {
        resolve(null)
      });
    }
  }
}