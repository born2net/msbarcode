import {BrowserModule} from '@angular/platform-browser';
import {NgModule, Inject, Injectable, Provider} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {HttpModule} from '@angular/http';
import {MaterialModule} from '@angular/material';
import {AppComponent} from './app.component';
import {NgReduxModule, DevToolsExtension, NgRedux, select} from 'ng2-redux'
import {AppStore} from "angular2-redux-util";
// import * as thunkMiddleware from 'redux-thunk';
import thunkMiddleware from 'redux-thunk';
import {applyMiddleware, Store, createStore, compose, combineReducers} from "redux";
import 'hammerjs';
import notify from '../reducers/NotifyReducer'
import {MyComp} from "./sample2";


var providing = [{
  provide: AppStore, useFactory: (ngRedux: NgRedux<IAppState>, devTools: DevToolsExtension) => {
    const reducers = combineReducers({notify});
    const middlewareEnhancer = applyMiddleware(<any>thunkMiddleware);
    const applyDevTools = () => devTools.isEnabled() ? devTools.enhancer : f => f;
    const enhancers: any = compose(middlewareEnhancer, applyDevTools);
    const createStoreWithEnhancers = enhancers(createStore);
    const store = createStoreWithEnhancers(reducers);
    ngRedux.provideStore(store);
    return new AppStore(store);
  }, deps: [NgRedux, DevToolsExtension]
}, {
  provide: "OFFLINE_ENV",
  useValue: false
}];

interface IAppState {
}

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
  providers: [providing],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor() {
  }
}
