import { Component, OnInit } from '@angular/core';
import { AmauriWalletService } from '../amauri-wallet.service';

@Component({
  selector: 'app-amauri-currency',
  templateUrl: './amauri-currency.component.html',
  styleUrls: ['./amauri-currency.component.css']
})
export class AmauriCurrencyComponent implements OnInit {

  constructor(public wallet: AmauriWalletService) {
    
   }

  ngOnInit() {
  }

}