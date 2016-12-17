import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
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
// import {SampleActions} from "../actions/SampleActions";
import {LocalStorage} from "../services/LocalStorage";


// import {NgReduxModule, DevToolsExtension, NgRedux, select} from 'ng2-redux'
import {MsLibModule} from "ng-mslib/dist/mslib.module";
import {ToastModule} from "ng2-toastr";
import {HttpAuth, UserService, NotifyService} from "../services/HttpAuth";
import {Observable} from "rxjs";

/// without ng2-redux ///
var providing = [{
    provide: AppStore, useFactory: () => {
        const reducers = combineReducers({notify, sample_reducer});
        const middlewareEnhancer = applyMiddleware(<any>thunkMiddleware);
        const isDebug = window['devToolsExtension']
        const applyDevTools = () => isDebug ? window['devToolsExtension']() : f => f;
        const enhancers: any = compose(middlewareEnhancer, applyDevTools());
        const store = createStore(reducers, enhancers);
        return new AppStore(store);
    }, deps: []
}, {
    provide: "OFFLINE_ENV",
    useValue: false
}, {
    provide: LocalStorage,
    useClass: LocalStorage
}, {
    provide: HttpAuth,
    useClass: HttpAuth
}, {
    provide: UserService,
    useClass: UserService
}, {
    provide: NotifyService,
    useClass: NotifyService
}];

/// with ng2-redux ///
// var providing = [{
//     provide: AppStore, useFactory: (ngRedux: NgRedux<any>, devTools: DevToolsExtension) => {
//         const reducers = combineReducers({notify, sample_reducer});
//         const middlewareEnhancer = applyMiddleware(<any>thunkMiddleware);
//         const applyDevTools = () => devTools.isEnabled() ? devTools.enhancer : (f:any) => f;
//         const enhancers: any = compose(middlewareEnhancer, applyDevTools);
//         const store = createStore(reducers, enhancers);
//         ngRedux.provideStore(store);
//         return new AppStore(store);
//     }, deps: [NgRedux, DevToolsExtension]
// }, {
//     provide: "OFFLINE_ENV",
//     useValue: false
// },  {
//     provide: LocalStorage,
//     useClass: LocalStorage
// },];

@NgModule({
    declarations: [
        AppComponent,
        MyComp
    ],
    imports: [
        BrowserModule,
        FormsModule,
        ReactiveFormsModule,
        HttpModule,
        ToastModule,
        MsLibModule.forRoot(),
        // NgReduxModule.forRoot(), //toggle
        MaterialModule.forRoot()
    ],
    providers: [providing],
    bootstrap: [AppComponent]
})
export class AppModule {
    // constructor() {
    //
    //     const source$ = Observable.interval(1000)
    //         .share()
    //     const mapped$ = source$.map(x => {
    //         if (x === 1) {
    //             throw new Error('oops');
    //         }
    //         return x;
    //     });
    //     source$.map(x=>x).take(3).subscribe(x => console.log('A', x));
    //     mapped$.take(3).subscribe(
    //         x => console.log('B', x),
    //         (err) => {
    //             console.log('Error handled: ' + err.message)
    //         }
    //     );
    //     // source$.subscribe(x => console.log('C', x));
    //
    // }

}


// const createStoreWithEnhancers = enhancers(createStore);
// const store = createStoreWithEnhancers(reducers);
