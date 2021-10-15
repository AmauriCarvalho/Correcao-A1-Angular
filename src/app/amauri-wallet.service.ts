import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

interface BitCoinRate{
  time: {updated: string};
  bpi: {
    USD: {
      rate_float: number;
    }
    EUR:{
      rate_float: number;
    }
  }
}

interface BrlBitCoinRate{
  time: {updated: string};
  bpi: {
    BRL: {
      rate_float: number;
    }
  }
}

@Injectable()
export class AmauriWalletService {
  BitCoinRates: Array<BitCoinRate> = [];
  BrlBitCoinRates: Array<BrlBitCoinRate> = [];

  diff: number = 0;

  bitCoins: number = 0;
  constructor(private http: HttpClient) { 
    this.updateBitCoinRates();
    setInterval(()=>{
      this.updateBitCoinRates();
    }, 60000)
  }

  updateBitCoinRates(){
    this.http.get<BitCoinRate>("https://api.coindesk.com/v1/bpi/currentprice.json").subscribe(data => {
      if(this.BitCoinRates.length>0){
        let length = this.BitCoinRates.length;
        this.diff = data.bpi.USD.rate_float - this.BitCoinRates[length-1].bpi.USD.rate_float;
      };
      this.BitCoinRates.push(data);
    });
    this.http.get<BrlBitCoinRate>("https://api.coindesk.com/v1/bpi/currentprice/BRL.json").subscribe(data => {
      this.BrlBitCoinRates.push(data);
    });
  }

  addBitCoins(valor: number){
    let length = this.BrlBitCoinRates.length;
    if(length>0){
      let btc = valor / this.BrlBitCoinRates[length-1].bpi.BRL.rate_float;
      this.bitCoins += btc;
    }
  }

  removeBitCoins(valor: number){
    let length = this.BrlBitCoinRates.length;
    if(length>0){
      let btc = valor / this.BrlBitCoinRates[length-1].bpi.BRL.rate_float;
      this.bitCoins -= btc;
    }
  }

  getBtcInBRL(){
    let length = this.BrlBitCoinRates.length;
    if(length>0){
      return this.bitCoins * this.BrlBitCoinRates[length-1].bpi.BRL.rate_float;
    }
    else{
      return 0;
    }
  }

  getBtcInUSD(){
    let length = this.BitCoinRates.length;
    if(length>0){
      return this.bitCoins * this.BitCoinRates[length-1].bpi.USD.rate_float;
    }
    else{
      return 0;
    }
  }
  getBtcInEUR(){
    let length = this.BitCoinRates.length;
    if(length>0){
      return this.bitCoins * this.BitCoinRates[length-1].bpi.EUR.rate_float;
    }
    else{
      return 0;
    }
  }

}