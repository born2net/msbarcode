import {Component} from '@angular/core';
import {Lib} from "../Lib";
import * as _ from 'lodash';
import {Map} from 'immutable';

var notify = function notify(state:Map<string, any> = Map<string, any>({}), action:any) {
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

    constructor() {
        setTimeout(() => {
            Lib.test();
            this.title = _.random(1, 51);
            console.log(StringJS('hello--world').humanize().s);
            console.log(StringJS('hello--world').camelize().s);
            console.log(StringJS(123).toCurrency());
            console.log(StringJS('&$^72y7edg').cleanChar());
        }, 1)
    }
}
