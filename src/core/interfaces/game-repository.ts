import { LottoGame } from './lotto-game';

export interface GameRepository {
  addGame(game: LottoGame): void;
  getGames(): Promise<LottoGame[] | null>;
}