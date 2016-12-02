//<reference path="../../node_modules/ng-mslib/dist/typings.d.ts" />

import {Component} from '@angular/core';
import {Lib} from "../Lib";
import * as _ from 'lodash';
import {Map} from 'immutable';
import {AppStore} from "angular2-redux-util";
import {SampleActions} from "../actions/SampleActions";
import {Ngmslib} from "ng-mslib";
// import {Ngmslib} from "ng-mslib";

var notify = function notify(state: Map<string, any> = Map<string, any>({}), action: any) {
  //console.log('ACTION: ' + action.type);
  return {data: Map({currentAction: action.type})};
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  public title: any = 'app works!';

  constructor(private appStore: AppStore, private action: SampleActions) {
    Ngmslib.GlobalizeStringJS();
    console.log(StringJS('string-js-is-init').humanize().s);
    Lib.test();
    var a = new Ngmslib(1);
    console.log(StringJS('go-home-now').humanize().s);
    Ngmslib.Cap('seanle');
    console.log(StringJS(12).toCurrency());
    console.log(a.replaceReducer(2));
    console.log(Ngmslib.Testing('cossolness....'));
    // console.log(Ngmslib.testAAA('cossolness....'));
    this.appStore.dispatch(action.serverStatus())
    this.title = _.random(1, 51);
    console.log(StringJS('hello--world').humanize().s);
    console.log(StringJS('hello--world').camelize().s);
    console.log(StringJS(123).toCurrency());
    console.log(StringJS('&$^72y7edg').cleanChar());
  }
}
