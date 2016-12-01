import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {HttpModule} from '@angular/http';
import {MaterialModule} from '@angular/material';
import {AppComponent} from './app.component';
import notify from '../reducers/NotifyReducer'
import {NgReduxModule, DevToolsExtension, NgRedux, select} from 'ng2-redux'
// import * as thunkMiddleware from 'redux-thunk';
import thunkMiddleware from 'redux-thunk';
import 'hammerjs';
import {applyMiddleware, Store, createStore, compose, combineReducers} from "redux";
import {MyComp} from "./sample2";

interface IAppState {}

@NgModule({
    declarations: [
        AppComponent,
        MyComp
    ],
    imports: [
        BrowserModule,
        FormsModule,
        HttpModule,
        NgReduxModule.forRoot(),
        MaterialModule.forRoot()
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule {
    constructor(private ngRedux: NgRedux<IAppState>, private devTools: DevToolsExtension) {
        const reducers = combineReducers({notify});
        const middlewareEnhancer = applyMiddleware(<any>thunkMiddleware);
        const applyDevTools = () => devTools.isEnabled() ? devTools.enhancer : f => f;
        const enhancers:any = compose(middlewareEnhancer, applyDevTools);
        const createStoreWithEnhancers = enhancers(createStore);
        const store = createStoreWithEnhancers(reducers);
        ngRedux.provideStore(store);
    }

    // constructor(private ngRedux: NgRedux<IAppState>, private devTools: DevToolsExtension) {
    //     let enhancers = [];
    //     if (true && devTools.isEnabled()) {
    //         enhancers = [...enhancers, devTools.enhancer()];
    //     }
    //     this.ngRedux.configureStore(
    //         notify,
    //         {},
    //         [],
    //         enhancers);
    //
    // }
}
