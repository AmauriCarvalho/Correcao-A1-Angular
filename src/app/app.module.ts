import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { HelloComponent } from './hello.component';
import { RouterModule } from '@angular/router';
import { AmauriCurrencyComponent } from './amauri-currency/amauri-currency.component';
import { AmauriWalletComponent } from './amauri-wallet/amauri-wallet.component';
import { AmauriWalletService } from './amauri-wallet.service';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  imports:      [ BrowserModule, FormsModule,
  HttpClientModule,
  RouterModule.forRoot([
    {path: 'currency', component: AmauriCurrencyComponent},
    {path: 'wallet', component: AmauriWalletComponent}
  ]) ],
  declarations: [ AppComponent, HelloComponent, AmauriCurrencyComponent, AmauriWalletComponent ],
  bootstrap:    [ AppComponent ],
  providers: [ AmauriWalletService]
})
export class AppModule { }
