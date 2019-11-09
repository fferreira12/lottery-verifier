import * as admin from 'firebase-admin';

import { GameRepository } from "../../core/interfaces/game-repository";
import { ResultRepository, LottoGame, LottoResult } from "../../app";
const serviceAccount = require('../../../config/lottery-verifier-firebase-adminsdk.json');

export class FirebaseRepository implements GameRepository, ResultRepository {
  
  private static instance: FirebaseRepository;
  db: FirebaseFirestore.Firestore;

  private constructor() {
    admin.initializeApp({
      credential: admin.credential.cert(serviceAccount)
    });
    this.db = admin.firestore();
  }

  static getInstance(): FirebaseRepository {
    if(!FirebaseRepository.instance) {
      FirebaseRepository.instance = new FirebaseRepository();
    }
    return FirebaseRepository.instance;
  }
  
  addGame(game: LottoGame) {
    let collection = this.db.collection('games');
    collection.add(game);
  }

  async getGames(): Promise<LottoGame[] | null> {
    let collection = this.db.collection('games');
    
    let snapshot = await collection.get();
    if(snapshot.empty) {
      return null;
    }
    let docs = snapshot.docs;
    let games = docs.map<LottoGame>(doc => {
      let data = doc.data();
      return {
        contest: data.contest,
        numbers: data.numbers,
        resultDate: data.resultDate
      } as LottoGame;
    })

    return games;

  }

  addResult(result: LottoResult) {
    let document = this.db.collection('results').doc(result.contest.toString());
    document.set(result);
  }

  async getResult(contest: number): Promise<LottoResult | null> {
    let document = this.db.collection('results').doc(contest.toString());
    
    let snapshot = await document.get();
    if(!snapshot.exists) {
      return null;
    }
    let data = snapshot.data();
    if(!data) {
      return null;
    }
    return {
      contest: data.contest,
      numbers: data.numbers,
      resultDate: data.resultDate
    }
  }
}