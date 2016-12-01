import {Component} from '@angular/core';
import * as _ from 'lodash';
import {Lib} from "../Lib";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  public title:any = 'app works!';
  constructor() {
    setTimeout(()=>{
      this.title = _.random(1, 51);
      Lib.test();
    },1)
  }
}
