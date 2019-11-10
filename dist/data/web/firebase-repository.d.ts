import * as admin from 'firebase-admin';
import { GameRepository } from "../../core/interfaces/game-repository";
import { ResultRepository, LottoGame, LottoResult } from "../../app";
export declare class FirebaseRepository implements GameRepository, ResultRepository {
    private static instance;
    db: FirebaseFirestore.Firestore;
    private constructor();
    static getInstance(serviceAccount: string | admin.ServiceAccount): FirebaseRepository;
    addGame(game: LottoGame): void;
    getGames(): Promise<LottoGame[] | null>;
    addResult(result: LottoResult): void;
    getResult(contest: number): Promise<LottoResult | null>;
}
