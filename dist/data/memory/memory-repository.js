"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class MemoryRepository {
    constructor() {
        this.results = {};
    }
    addResult(result) {
        this.results[result.contest] = result;
    }
    async getResult(contest) {
        if (this.results[contest]) {
            return new Promise((resolve, reject) => {
                resolve(this.results[contest]);
            });
        }
        else {
            return new Promise((resolve, reject) => {
                resolve(null);
            });
        }
    }
}
exports.MemoryRepository = MemoryRepository;
