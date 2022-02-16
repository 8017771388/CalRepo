import { Injectable } from '@angular/core';
import * as moment from 'moment';

@Injectable({
  providedIn: 'root'
})
export class UtilityService {

  constructor() { }
  /**
   * generate uuid transaction ID for logging purpose
   */
  uuidv4(): string {
    function S4() {
        const randomValue = Math.random(); //crypto.getRandomValues(new Uint8Array(1))[0];
        return (((1 + randomValue)*0x10000)|0).toString(16).substring(1); 
    }
     
    // then to call it, plus stitch in '4' in the third group
    return (S4() + S4() + "-" + S4() + "-4" + S4().substr(0,3) + "-" + S4() + "-" + S4() + S4() + S4()).toLowerCase();
  }

  /**
   * convert date to EST
   * @param date 
   */
  convertToEST(date): string {
    return moment(date.toLocaleString("en-US", {timeZone: "America/New_York"})).format("L");
  }
}
