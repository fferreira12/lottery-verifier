"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class MemoryRepository {
    constructor() {
        this.results = {};
    }
    add(result) {
        this.results[result.contest] = result;
    }
    get(contest) {
        if (this.results[contest]) {
            return this.results[contest];
        }
        else {
            return null;
        }
    }
}
exports.MemoryRepository = MemoryRepository;
