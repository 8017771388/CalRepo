import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
//import {  Observable } from 'rxjs';
import { map } from "rxjs/operators";
import { HttpService } from "../../_shared/services/http.services";
import { AppSettings } from "../../_shared/constants/api-constant";
import { Observable } from 'rxjs';
import { ApplicationRequest } from '../../_shared/models/tacalculator/application-request';
import { Response } from '../../_shared/models/response';
import { TAApplication } from '../../_shared/models/tacalculator/ta-application';

@Injectable({
  providedIn: 'root'
})
export class TAcalculatorService {
    private apiController = "Application";
    constructor(private httpService: HttpService, private httpClient: HttpClient) { }
    //Post(data: ApplicationRequest) {
     //var url = AppSettings.Mule_Service_URL + this.apiController;
    //    return this.httpService
    //        .post(url, data, AppSettings.apiKey)
    //        .pipe(map((response) => response));
    //}
    getProfitLoss(param) {
       var url = AppSettings.getProfitLoss;
      
        url = url + "?" + "offerId=" + param.offerId;//+"&modelId="+param.modelId+"&termId="+param.termId;
       console.log("ffffffffffffff",url)
       return this.httpService
           .get(url, param, AppSettings.apiKey)
           .pipe(map((response) => response));
    }

    getOfferCriteria(offerId, param) {
        var url = AppSettings.getOfferCriteria;

        if(param != ""){
            url = url + "?"+"offerId="+offerId+"&modelId="+param.modelID+"&termId="+param.termID;
        }
        else{
            url = url + "?"+"offerId="+offerId
        }        
        
        return this.httpService
            .get(url, '', AppSettings.apiKey)
            .pipe(map((response) => response));
     }

    getNPVData(offerId, param) {
        var url = AppSettings.getNPVData;
       
        url = url + "?"+"offerId="+offerId+"&modelId="+param.modelID+"&termId="+param.termID;
        console.log("data",url)
        return this.httpService
            .get(url, offerId, AppSettings.apiKey)
            .pipe(map((response) => response));
     }
     getdynaminAssumptionData(offerId){

        var url = AppSettings.getdynaminAssumptionData;
       
        url = url + "?"+"offerId="+offerId;
        console.log("data",url)
        return this.httpService
            .get(url, offerId, AppSettings.apiKey)
            .pipe(map((response) => response));
     }
     

    createOffer(data: ApplicationRequest) {
        var url = AppSettings.createOffer;
        return this.httpService
            .post(url, data, AppSettings.apiKey)
            .pipe(map((response) => response));
    }

    createUser(data) {
        var url = AppSettings.createUser;
        return this.httpService
            .post(url, data, AppSettings.apiKey)
            .pipe(map((response) => response));
    }


    public Post(data: ApplicationRequest): Observable<Response<TAApplication>> {
        var url = AppSettings.REST_URL +"/"+ this.apiController;//this.baseUrl + this.apiController;
        return this.httpClient.post<Response<TAApplication>>(url, data);
    }

    public Update(data: TAApplication): Observable<Response<TAApplication>> {
        var url = AppSettings.REST_URL + "/" + this.apiController;//this.baseUrl + this.apiController;
        return this.httpClient.put<Response<TAApplication>>(url, data);
    }

    getTableDataType() {
                
        return this.httpService
            .get(AppSettings.getDataType, '', AppSettings.apiKey)
            .pipe(map((response) => response));
     }
     getOfferOutput() {
                
        return this.httpService
            .get(AppSettings.getOfferOutput, '', AppSettings.apiKey)
            .pipe(map((response) => response));
     }
}
