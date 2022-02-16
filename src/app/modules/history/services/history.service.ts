import { Injectable } from '@angular/core';
import { HttpService } from "../../_shared/services/http.services";
import { AppSettings } from "../../_shared/constants/api-constant";
import { CommonModule } from '@angular/common';
import { Observable } from 'rxjs';
import { Response } from '../../_shared/models/response';
import { map } from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class HistoryService {

    constructor(private httpService: HttpService) { }

    getOffersHistory(param) {
        var url = AppSettings.getOffersHistory;


        url = url + "?" + "userName=" + param.username + "&isAdmin=" + param.isAdmin + "&pageSize=" + param.pageSize + "&pageNumber=" + param.pageNumber;

        console.log("data", url)
        return this.httpService
            .get(url)
            .pipe(map((response) => response));
    }


    getOfferHistoryInput(id){
      var url = AppSettings.getOffersHistoryInput;

        url = url + "?" + "offerId=" + id;
        return this.httpService
            .get(url)
            .pipe(map((response) => response));
    }

    getOfferHistoryOutput(id){
      var url = AppSettings.getOffersHistoryOutput;

        url = url + "?" + "offerId=" + id;
        return this.httpService
            .get(url)
            .pipe(map((response) => response));
    }

    getCreatedByList(param){
      var url = AppSettings.getCreatedByList;
      url = url + "?" + "userName=" + param.username + "&isAdmin=" + param.isAdmin;
        //url = url + "?" + "offerId=" + id;
        return this.httpService
            .get(url)
            .pipe(map((response) => response));
    }

}
