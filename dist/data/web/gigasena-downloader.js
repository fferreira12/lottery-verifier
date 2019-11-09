"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const puppeteer_1 = __importDefault(require("puppeteer"));
class GigasenaDownloader {
    constructor() {
        this.baseUrl = 'https://www.gigasena.com.br/loterias/mega-sena/resultados/resultado-mega-sena-{{contest}}.htm';
        this.replaceStr = '{{contest}}';
        this.numberElementIdPrefix = 'megasena-dz';
        this.contestElementId = 'megasena-s';
        this.contestDateId = 'megasena-d';
        this.startNumberIndex = 0;
        this.endNumberIndex = 5;
    }
    async downloadResult(contest) {
        try {
            let url = this.baseUrl.replace(this.replaceStr, contest.toString());
            let page = await this.getPage(url);
            let numbers = await this.getNumbersFromPage(page);
            let contestNumber = await (this.getContestNumberFromPage(page));
            let date = await this.getDateFromPage(page);
            let result = {
                contest: contestNumber,
                numbers,
                resultDate: date
            };
            return result;
        }
        catch (error) {
            console.log(error);
            return await null;
        }
    }
    async getPage(url) {
        const browser = await puppeteer_1.default.launch();
        const page = await browser.newPage();
        await page.goto(url);
        return page;
    }
    async getNumbersFromPage(page) {
        let numbers = [];
        for (let i = this.startNumberIndex; i <= this.endNumberIndex; i++) {
            let selector = '#' + this.numberElementIdPrefix + i;
            const element = await page.$(selector);
            if (!element) {
                continue;
            }
            const text = await page.evaluate(element => element.textContent, element);
            numbers.push(parseInt(text));
        }
        return numbers;
    }
    async getContestNumberFromPage(page) {
        const element = await page.$('#' + this.contestElementId);
        const text = await page.evaluate(element => element.textContent, element);
        return parseInt(text);
    }
    async getDateFromPage(page) {
        const element = await page.$('#' + this.contestDateId);
        const text = await page.evaluate(element => element.textContent, element);
        let dateStrings = text.split('/');
        let [day, month, year] = dateStrings.map(str => {
            return parseInt(str);
        });
        let date = new Date(year, month - 1, day);
        return date;
    }
}
exports.GigasenaDownloader = GigasenaDownloader;
