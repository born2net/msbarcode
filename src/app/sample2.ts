import {Component} from "@angular/core";
import {Compbaser} from "../comps/Compbases";

@Component({
    selector: 'my-comp',
    template: `
      I am : {{me}}
    `,
})
export class MyComp extends Compbaser {
}
