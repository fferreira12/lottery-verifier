import { ResultDownloader } from "../../core/interfaces/result-downloader";
import { LottoResult } from "../../core/interfaces/lotto-result";
import puppeteer from "puppeteer";

export class GigasenaDownloader implements ResultDownloader {
  readonly baseUrl = 'https://www.gigasena.com.br/loterias/mega-sena/resultados/resultado-mega-sena-{{contest}}.htm';
  replaceStr = '{{contest}}';
  numberElementIdPrefix = 'megasena-dz';
  contestElementId = 'megasena-s';
  contestDateId = 'megasena-d'
  startNumberIndex = 0;
  endNumberIndex = 5;

  async downloadResult(contest: number): Promise<LottoResult | null> {
    try {
      let url = this.baseUrl.replace(this.replaceStr, contest.toString());
      let page = await this.getPage(url).catch(err => {throw new Error(err);});
      let numbers = await this.getNumbersFromPage(page).catch(err => {throw new Error(err);});
      let contestNumber = await (this.getContestNumberFromPage(page)).catch(err => {throw new Error(err);});
      let date = await this.getDateFromPage(page).catch(err => {throw new Error(err);});
      let result = {
        contest: contestNumber,
        numbers, 
        resultDate: date
      } as LottoResult;
      return result;
    } catch(error) {
      //console.log(error);
      throw error;
    }
  }

  async getPage(url: string) {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto(url);
    return page
  }

  async getNumbersFromPage(page: puppeteer.Page) {
    let numbers: number[] = []
    for(let i =  this.startNumberIndex; i <= this.endNumberIndex; i++) {
      let selector = '#' + this.numberElementIdPrefix + i;
      const element = await page.$(selector);
      if(!element) {
        continue;
      }
      const text: string = await page.evaluate(element => element.textContent, element);
      numbers.push(parseInt(text));
    }
    return numbers;
  }

  async getContestNumberFromPage(page: puppeteer.Page) { 
    const element = await page.$('#'+this.contestElementId);
    const text: string = await page.evaluate(element => element.textContent, element);
    return parseInt(text);
  }

  async getDateFromPage(page: puppeteer.Page) { 
    const element = await page.$('#'+this.contestDateId);
    const text: string = await page.evaluate(element => element.textContent, element);
    let dateStrings = text.split('/');
    let [day, month, year] = dateStrings.map(str => {
      return parseInt(str);
    });

    let date = new Date(year, month - 1, day);
    
    return date;
  }


}
