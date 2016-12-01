import {NgRedux} from "ng2-redux";
import {Component} from "@angular/core";

@Component({
    selector: 'my-comp',
    template: `
      my-comp
    `,
})
export class MyComp {
    constructor(private store: NgRedux<any>) {


        this.store.dispatch({type: 'AA', payload: 123})
        this.store.dispatch(this.act('123'));
    }

    private act = (i_value) => {
        return (dispatch) => {
            setTimeout(() => {
                dispatch({type: 'BB', payload: i_value})
            }, 5000)
        }
    }
}

