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
  public openDialog(){
    if (this.contGroup.value.selectedType=='customer' && this.contGroup.value.orderNumber.length < 5)
      return this.toastr.error('order number is too short');
    if (this.contGroup.value.serials.length < 8)
      return this.toastr.error('no valid serials');
    if (this.contGroup.value.password.length < 4)
      return this.toastr.error('no password entered');

    this.toastr.info('saving to server')
    setTimeout(()=>{
      this.toastr.success('saved to server')
    },2000)
  }
}

