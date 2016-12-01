/** Common Library **/

import {
    Injectable,
    Component
} from "@angular/core";
import * as Immutable from "immutable";
import {
    List,
    Map
} from "immutable";
import * as _ from "lodash";
import * as moment_ from "moment";
import * as ss from 'string';

//import {LoggerMiddleware} from "angular2-redux-util";
//import {BusinessUser} from "./business/BusinessUser";
//import * as thunkMiddleware from 'redux-thunk';

export const moment = moment_["default"];


@Injectable()
export class Lib {

  static StoreFactory(reducerList: Object) {
    return () => {
    };
  }

  static test(){
    console.log('lib');
  }
}


/***********************************
 *
 * StringJS() library extension
 *
 ***********************************/
// window['StringJS'] = ss.default;
MyS.prototype = ss('')
MyS.prototype.constructor = MyS;
function MyS(val) {
    this.setValue(val);
}
 //
var formatMoney = function(n, c, d, t){
    var c = isNaN(c = Math.abs(c)) ? 2 : c,
        d = d == undefined ? "." : d,
        t = t == undefined ? "," : t,
        s = n < 0 ? "-" : "",
        i:any = String(parseInt(n = Math.abs(Number(n) || 0).toFixed(c))),
        j = (j = i.length) > 3 ? j % 3 : 0;
    return s + (j ? i.substr(0, j) + t : "") + i.substr(j).replace(/(\d{3})(?=\d)/g, "$1" + t) + (c ? d + Math.abs(n - i).toFixed(c).slice(2) : "");
};

MyS.prototype.isBlank = function () {
    var value = this.s;
    if (_.isNaN(value))
        return true;
    if (_.isUndefined(value))
        return true;
    if (_.isNull(value))
        return true;
    if (_.isEmpty(String(value)))
        return true;
    return false;
}

MyS.prototype.isNotBlank = function () {
    var value = this.s;
    if (_.isNaN(value))
        return false;
    if (_.isUndefined(value))
        return false;
    if (_.isNull(value))
        return false;
    if (_.isEmpty(String(value)))
        return false;
    return true;
}

/**
 *  booleanToNumber
 *  convert boolean to a number 0 or 1
 *  if forceCast is true, it will always return a number, else it will alow strings to pass through it
 * @param forceCast
 * @returns {any}
 */
MyS.prototype.booleanToNumber = function (forceCasting: boolean = false) {
    var value = this.s;
    if (value == '')
        return 0;
    if (_.isUndefined(value) || _.isNull(value) || value == 'NaN' || value == 'null' || value == 'NULL')
        return 0;
    if (value === "0" || value === 'false' || value === "False" || value === false)
        return 0;
    if (value === 1 || value === "true" || value === "True" || value === true)
        return 1;
    if (forceCasting) {
        return parseInt(value);
    } else {
        return value;
    }
}

MyS.prototype.toCurrency = function (format?: 'us'|'eu') {

    var value = StringJS(this.s).toFloat(2);
    if (_.isNaN(value))
        value = 0;
    switch (format) {
        case 'eu': {
            return '€' + formatMoney(value, 2, '.', ',');
        }
        case 'us': {}
        default: {
            return '$' + formatMoney(value, 2, '.', ',');
        }
    }
}

MyS.prototype.toPercent = function () {
    return StringJS(this.s).toFloat(2) + '%';
}

MyS.prototype.fileTailName = function (i_level) {
    var fileName = this.s;
    var arr = fileName.split('/');
    var size = arr.length;
    var c = arr.slice(0 - i_level, size)
    return new this.constructor(c.join('/'));
}

MyS.prototype.cleanChar = function () {
    var value = this.s;
    if (_.isUndefined(value))
        return '';
    if (_.isNull(value))
        return '';
    if (_.isNumber(value))
        return value;
    if (_.isBoolean(value))
        return value;
    value = value.replace(/\}/g, ' ');
    value = value.replace(/%/g, ' ');
    value = value.replace(/{/g, ' ');
    value = value.replace(/"/g, '`');
    value = value.replace(/'/g, '`');
    value = value.replace(/&/g, 'and');
    value = value.replace(/>/g, ' ');
    value = value.replace(/</g, ' ');
    value = value.replace(/\[/g, ' ');
    value = value.replace(/]/g, ' ');
    value = value.replace(/#/g, ' ');
    value = value.replace(/\$/g, ' ');
    value = value.replace(/\^/g, ' ');
    value = value.replace(/;/g, ' ');
    return value;
}

window['StringJS'] = function (str) {
    if (_.isNull(str) || _.isUndefined(str))
        str = '';
    return new MyS(str);
}
