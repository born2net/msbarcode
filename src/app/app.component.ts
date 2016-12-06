import {Component, ViewContainerRef} from '@angular/core';
import {AppStore} from "angular2-redux-util";
import {SampleActions} from "../actions/SampleActions";
import {Ngmslib} from "ng-mslib";
import {ToastsManager} from "ng2-toastr";
import {FormBuilder, FormGroup} from "@angular/forms";



@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  public title: any = 'app works!';
  public data: any = {default: 'storage'};
  public selectedType:string = 'storage';
  public contGroup: FormGroup;

  constructor(private fb: FormBuilder, private toastr: ToastsManager, private vRef: ViewContainerRef, private appStore: AppStore, private action: SampleActions) {
    this.toastr.setRootViewContainerRef(vRef);
    Ngmslib.GlobalizeStringJS();
    console.log(StringJS('string-js-is-init').humanize().s);

    this.contGroup = fb.group({
      'selectedType': [''],
      'password': [''],
      'serials': [''],
      'orderNumber': ['']
    });

  }

  private onSelect(event){
    this.selectedType = this.data.default;
  }

  private runReport(){
    this.toastr.success('aaa','aaaa');

  }
  private openDialog(){
    this.toastr.success(JSON.stringify(this.contGroup.value));
  }
}

