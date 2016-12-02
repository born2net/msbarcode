import {BrowserModule} from '@angular/platform-browser';
import {NgModule, Inject, Injectable, Provider} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {HttpModule} from '@angular/http';
import {MaterialModule} from '@angular/material';
import {AppComponent} from './app.component';
import {AppStore} from "angular2-redux-util";
import {applyMiddleware, createStore, compose, combineReducers} from "redux";
import thunkMiddleware from 'redux-thunk';
import 'hammerjs';
import notify from '../reducers/NotifyReducer'
import sample_reducer from '../reducers/SampleReducer'
import {MyComp} from "./sample2";
import {SampleActions} from "../actions/SampleActions";


import {NgReduxModule, DevToolsExtension, NgRedux, select} from 'ng2-redux' //toggle

// var providing = [{
//   provide: AppStore, useFactory: () => {
//     const reducers = combineReducers({notify, sample_reducer});
//     const middlewareEnhancer = applyMiddleware(<any>thunkMiddleware);
//     const isDebug = window['devToolsExtension']
//     const applyDevTools = () => isDebug ? window['devToolsExtension']() : f => f;
//     const enhancers: any = compose(middlewareEnhancer, applyDevTools());
//     const createStoreWithEnhancers = enhancers(createStore);
//     const store = createStoreWithEnhancers(reducers);
//     return new AppStore(store);
//   }, deps: []
// }, {
//   provide: "OFFLINE_ENV",
//   useValue: false
// },{
//   provide: SampleActions,
//   useClass: SampleActions
// }];

var providing = [{
  provide: AppStore, useFactory: (ngRedux: NgRedux<any>, devTools: DevToolsExtension) => {
    const reducers = combineReducers({notify, sample_reducer});
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
},{
  provide: SampleActions,
  useClass: SampleActions
}];

@NgModule({
  declarations: [
    AppComponent,
    MyComp
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    NgReduxModule.forRoot(), //toggle
    MaterialModule.forRoot()
  ],
  providers: [providing],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor() {
  }
}
