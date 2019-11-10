"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const admin = __importStar(require("firebase-admin"));
//const serviceAccount = require('../../../config/lottery-verifier-firebase-adminsdk.json');
class FirebaseRepository {
    constructor(serviceAccount) {
        admin.initializeApp({
            credential: admin.credential.cert(serviceAccount)
        });
        this.db = admin.firestore();
    }
    static getInstance(serviceAccount) {
        if (!FirebaseRepository.instance) {
            FirebaseRepository.instance = new FirebaseRepository(serviceAccount);
        }
        return FirebaseRepository.instance;
    }
    addGame(game) {
        let collection = this.db.collection('games');
        collection.add(game);
    }
    async getGames() {
        let collection = this.db.collection('games');
        let snapshot = await collection.get();
        if (snapshot.empty) {
            return null;
        }
        let docs = snapshot.docs;
        let games = docs.map(doc => {
            let data = doc.data();
            return {
                contest: data.contest,
                numbers: data.numbers,
                resultDate: data.resultDate
            };
        });
        return games;
    }
    addResult(result) {
        let document = this.db.collection('results').doc(result.contest.toString());
        document.set(result);
    }
    async getResult(contest) {
        let document = this.db.collection('results').doc(contest.toString());
        let snapshot = await document.get();
        if (!snapshot.exists) {
            return null;
        }
        let data = snapshot.data();
        if (!data) {
            return null;
        }
        return {
            contest: data.contest,
            numbers: data.numbers,
            resultDate: data.resultDate
        };
    }
}
exports.FirebaseRepository = FirebaseRepository;
