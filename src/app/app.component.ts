import {Component, ViewContainerRef} from '@angular/core';
import {AppStore} from "angular2-redux-util";
import {SampleActions} from "../actions/SampleActions";
import {Ngmslib} from "ng-mslib";
import {ToastsManager, ToastOptions} from "ng2-toastr";
import {FormBuilder, FormGroup} from "@angular/forms";
import {Http} from "@angular/http";
import 'rxjs/add/operator/catch';
import {Observable} from "rxjs";
import {LocalStorage} from "../services/LocalStorage";


@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent {

    public department: string;
    public data: any = {default: 'storage'};
    public loggedIn: boolean = false;
    public selectedType: string = 'storage';
    public contGroup: FormGroup;
    private user: string;
    private pass: string;

    constructor(private http: Http, private fb: FormBuilder, private toastr: ToastsManager, private vRef: ViewContainerRef, private appStore: AppStore, private localStorage: LocalStorage) {
        this.toastr.setRootViewContainerRef(vRef);
        Ngmslib.GlobalizeStringJS();
        console.log(StringJS('string-js-is-init').humanize().s);

        this.contGroup = fb.group({
            'selectedType': [''],
            'user': [''],
            'password': [''],
            'serials': [''],
            'orderNumber': ['']
        });
        var user = this.localStorage.getItem('user')
        var pass = this.localStorage.getItem('pass')
        if (user && pass)
            this.onPasswordEntered(user, pass);
    }

    private onSelect(event) {
        this.selectedType = this.data.default;
    }

    private runReport() {
        this.toastr.success('aaa', 'aaaa');

    }

    private logout(){
        this.toastr.success('logged out');
        this.localStorage.removeItem('user');
        this.localStorage.removeItem('pass');

    }
    private onPasswordEntered(i_user?, i_pass?) {
        var user, pass;
        if (i_user && i_pass) {
            user = i_user;
            pass = i_pass;
        } else {
            user = this.contGroup.value.user;
            pass = this.contGroup.value.password;
        }


        this.http.get(`https://secure.digitalsignage.com:442/inventoryManagerAuth/${user}/${pass}`).map(result => result.json())
            .catch((err, o: Observable<any>) => {
                this.toastr.error('problem loading account', err);
                return <any>{status: 0, msg: 'problem with server'};
            }).subscribe((data: any) => {
            if (data.status == 0){
                this.localStorage.removeItem('user');
                this.localStorage.removeItem('pass');
                return this.toastr.error(data.msg, '', {dismiss: 'click'});
            }
            this.department = data.msg.department;
            this.loggedIn = true;
            this.localStorage.setItem('user',user);
            this.localStorage.setItem('pass',pass);
        }, (err) => {
            // return this.toastr.error(err,'3');
        })

        console.log(this.contGroup.value.password);
    }

    public openDialog() {
        if (this.contGroup.value.selectedType == 'customer' && this.contGroup.value.orderNumber.length < 5)
            return this.toastr.error('order number is too short');
        if (this.contGroup.value.serials.length < 8)
            return this.toastr.error('no valid serials');
        if (this.contGroup.value.password.length < 4)
            return this.toastr.error('no password entered');
        var serials = this.contGroup.value.serials.replace(/\n/ig, ':NEW:');
        this.http.get(`https://secure.digitalsignage.com:442/inventoryManager/${this.contGroup.value.password}/${this.contGroup.value.selectedType}/${serials}`).map(result => result.json())
            .catch((err, o: Observable<any>) => {
                this.toastr.error('problem savings data to server ', err);
                return <any>{status: 0, msg: 'problem with server'};
            }).subscribe((data: any) => {
            if (data.status == 0)
                return this.toastr.error(data.msg, '', {dismiss: 'click'});

            return this.toastr.success(data.msg);

        }, (err) => {
            // return this.toastr.error(err,'3');
        })


    }
}

