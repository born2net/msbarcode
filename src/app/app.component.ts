import {Component} from '@angular/core';
import * as _ from 'lodash';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  public title = 'app works!';

  constructor() {
    setTimeout(()=>{
      console.log(_.random(1, 2000));
      console.log(12);
      console.log(3);
    },1)

  }
}
