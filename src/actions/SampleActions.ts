import {
  Injectable,
  Inject
} from "@angular/core";
import {
  Actions,
  AppStore
} from "angular2-redux-util";
import {Http} from "@angular/http";
import "rxjs/add/operator/map";
import "rxjs/add/operator/mergeMap";
import "rxjs/add/operator/merge";
import "rxjs/add/operator/debounceTime";

export const APP_INIT = 'APP_INIT';
export const SERVERS_STATUS = 'SERVERS_STATUS';

export enum AuthState {
  FAIL,
  PASS,
  TWO_FACTOR
}


@Injectable()
export class SampleActions {

}
