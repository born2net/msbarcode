import {NgRedux} from "ng2-redux";
import {Component, Inject} from "@angular/core";
import {AppStore} from "angular2-redux-util";

@Component({
  selector: 'my-comp',
  template: `
      my-comp
    `,
})
export class MyComp {
  constructor(private store: NgRedux<any>, private appStore: AppStore, @Inject('OFFLINE_ENV') private offlineEnv) {
    this.store.dispatch({type: 'AA', payload: 123})
    this.store.dispatch(this.act('112'));
    this.appStore.dispatch({type: 'COME ON'})
    console.log('>>> offline: ' + this.offlineEnv);
  }

  //aaa
  private act = (i_value): any => {
    return (dispatch) => {
      setTimeout(() => {
        dispatch({type: 'BB', payload: i_value})
      }, 500)
    }
  }
}
