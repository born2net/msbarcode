import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {HttpModule} from '@angular/http';
import {MaterialModule} from '@angular/material';
import {AppComponent} from './app.component';
import 'hammerjs';
import notify from "../reducers/NotifyReducer";
import {Lib} from "../Lib";
import {AppStore} from "angular2-redux-util";

export var providing = [
    {
        provide: AppStore,
        useFactory: Lib.StoreFactory({
            notify
        })
    }];


@NgModule({
    declarations: [
        AppComponent
    ],
    imports: [
        BrowserModule,
        FormsModule,
        HttpModule,
        MaterialModule.forRoot()
    ],
    providers: [providing],
    bootstrap: [AppComponent]
})
export class AppModule {
}
