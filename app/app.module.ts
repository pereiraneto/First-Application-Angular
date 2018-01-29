import { NgModule } from "@angular/core"; 
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import {ContatosModule} from './contatos/contatos.module';
import {AppRoutingModule} from './app-routing.module';
import {HttpModule} from '@angular/http';
import {DialogService} from './dialog.service';
import {FormsModule} from '@angular/forms';

import {InMemoryWebApiModule} from 'angular-in-memory-web-api';
import {InMemoryDataService} from './in-memory-data.service';

@NgModule({
    imports: [
        AppRoutingModule,
        BrowserModule,
        ContatosModule,
        FormsModule,
        HttpModule,
        InMemoryWebApiModule.forRoot(InMemoryDataService)
    ],
    declarations: [AppComponent],
    providers: [
        DialogService
    ],
    bootstrap: [AppComponent]
})
export class AppModule{

}