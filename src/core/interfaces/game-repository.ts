import { LottoGame } from './lotto-game';

export interface GameRepository {
  add(result: LottoGame): void;
  get(): Promise<LottoGame[] | null>;
}