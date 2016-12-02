import {NgRedux, select} from "ng2-redux"; //toggle
import {Component, Inject} from "@angular/core";
import {AppStore} from "angular2-redux-util";
import {Compbaser} from "../comps/Compbases";
import {Ngmslib} from "ng-mslib";

@Component({
  selector: 'my-comp',
  template: `
      my-comp
      <p>1 {{obs$ | async | json }}</p>
      <p>2 {{_obs$ | async | json }}</p>
    `,
})
export class MyComp extends Compbaser {
  // constructor(private appStore: AppStore, @Inject('OFFLINE_ENV') private offlineEnv) {
  constructor(private store: NgRedux<any>, private appStore: AppStore, @Inject('OFFLINE_ENV') private offlineEnv) { //toggle
    super();
    var a = new Ngmslib(1);
    console.log(Ngmslib.Testing('I am static'));
    console.log(a.replaceReducer(2));
    console.log(StringJS('/a/a/a/a/a').fileTailName(3).s);
    // console.log(Ngmslib.testAAA('cossolness....'));

    this.cancelOnDestroy(this.appStore.sub((value) => {
      console.log('ABC D' + value);
    }, 'sample_reducer'))


    StringJS('a').capitalize()
    this.store.dispatch({type: '111', payload: 111})
    this.store.dispatch(this.act('333'));
    this.appStore.dispatch({type: '3332'})
    console.log('>>> offline: ' + this.offlineEnv + ' ' + this._obs$);
  }

  @select(state => state.notify)
  set setCounter(obs$) {
    alert(1);
    this._obs$ = obs$;
    this._obs$.map(e => e);
  }

  @select('notify') obs$

  private _obs$;

  private act = (i_value): any => {
    return (dispatch) => {
      setTimeout(() => {
        dispatch({type: '555', payload: i_value})
      }, 500)
    }
  }
}
