import { ResultDownloader } from "../../core/interfaces/result-downloader";
import { LottoResult } from "../../core/interfaces/lotto-result";
import puppeteer from "puppeteer";
export declare class GigasenaDownloader implements ResultDownloader {
    readonly baseUrl = "https://www.gigasena.com.br/loterias/mega-sena/resultados/resultado-mega-sena-{{contest}}.htm";
    replaceStr: string;
    numberElementIdPrefix: string;
    contestElementId: string;
    contestDateId: string;
    startNumberIndex: number;
    endNumberIndex: number;
    downloadResult(contest: number): Promise<LottoResult | null>;
    getPage(url: string): Promise<puppeteer.Page>;
    getNumbersFromPage(page: puppeteer.Page): Promise<number[]>;
    getContestNumberFromPage(page: puppeteer.Page): Promise<number>;
    getDateFromPage(page: puppeteer.Page): Promise<Date>;
}
