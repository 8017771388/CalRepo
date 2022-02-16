import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AssumptionTable } from '../../../_shared/models/assumptiontables/assumption-table';
//import { EnvironmentService } from '../environment.service';
import { Response } from '../../../_shared/models/response';
//import { identifierName } from '@angular/compiler';
import { AssumptionTableRows } from '../../../_shared/models/assumptiontables/assumption-table-rows';
import { LookupDataType } from '../../../_shared/models/assumptiontables/lookup-data-type';
import { AssumptionTablePostUpdateRequest } from '../../../_shared/models/assumptiontables/assumptionTableRequest';
import { LookupCategories } from '../../../_shared/models/assumptiontables/lookup-categories';
import { stringify } from 'querystring';
import { HttpService } from '../../../_shared/services/http.services';
import { AppSettings } from '../../../_shared/constants/api-constant';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AssumptiontableService {
  private baseUrl: string;

    constructor(private httpService: HttpService, private httpClient: HttpClient) {
   // this.baseUrl = env.baseUrl;
    }

    //getTables() {
    //    return this.httpService
    //        .get(AppSettings.getTables, '', AppSettings.apiKey)
    //        .pipe(map(response => response));
    //}
    public getTables(): Observable<Response<Array<AssumptionTable[]>>> {
        var url = AppSettings.REST_URL + "/LookupTables";
    var observable = this.httpClient.get<Response<Array<AssumptionTable[]>>>(url);
    return observable;
  };

  public getActiveTables(): Observable<Response<Array<AssumptionTable[]>>> {
      var url = AppSettings.Mule_Service_URL + "/LookupTables/GetActiveTables";
    var observable = this.httpClient.get<Response<Array<AssumptionTable[]>>>(url);
    return observable;
  };

    //getActiveTables() {
    //    return this.httpService
    //        .get(AppSettings.getActiveTables, '', AppSettings.apiKey)
    //        .pipe(map(response => response));
    //};
  public getLookupDataType(): Observable<Response<LookupDataType[]>> {
      var url = AppSettings.Mule_Service_URL + "/LookupTables/GetLookupDataType";
    var observable = this.httpClient.get<Response<LookupDataType[]>>(url);
    return observable;
  };
    //getLookupDataType() {
    //    return this.httpService
    //        .get(AppSettings.getLookupDataType, '', AppSettings.apiKey)
    //        .pipe(map(response => response));
    //};
  public GetLookupCategories(): Observable<Response<LookupCategories[]>> {
      var url = AppSettings.Mule_Service_URL + "/LookupTables/GetLookupCategories";
    var observable = this.httpClient.get<Response<LookupCategories[]>>(url);
    return observable;
    };
    //getLookupCategories() {
    //    return this.httpService
    //        .get(AppSettings.getLookupCategories, '', AppSettings.apiKey)
    //        .pipe(map(response => response));
    //};

  public getisrequiredValues() {
    return [
      { id: 'true', name: 'Yes' },
      { id: 'false', name: 'No' }
    ];
  }
    //save(param) {
    //    return this.httpService
    //        .post(AppSettings.getActiveTables, param, AppSettings.apiKey)
    //        .pipe(map((response) => response));
    //}
  public Save(data: AssumptionTablePostUpdateRequest): Observable<Response<AssumptionTable>> {
      var url = AppSettings.Mule_Service_URL + "/LookupTables";
    return this.httpClient.post<Response<AssumptionTable>>(url, data);
  }

  public Update(data: AssumptionTablePostUpdateRequest): Observable<Response<AssumptionTable>> {
      var url = AppSettings.Mule_Service_URL + "/LookupTables";
    return this.httpClient.put<Response<AssumptionTable>>(url, data);
  }

    //update(param) {
    //    return this.httpService
    //        .post(AppSettings.getActiveTables, param, AppSettings.apiKey)
    //        .pipe(map((response) => response));
    //}
  public GetTableList(ids: Array<number>): Observable<Response<Array<AssumptionTable>>> {

    if(ids.length == 0) return new Observable<Response<Array<AssumptionTable>>>();

      var url = AppSettings.Mule_Service_URL + "/LookupTables/GetByTableList?ids=";

    var stringToAppend = "";
    
    ids.forEach((id, index) => {
      stringToAppend += id
      if(index != ids.length-1)
      stringToAppend += "&ids=";
    });
    
    return this.httpClient.get<Response<Array<AssumptionTable>>>(url + stringToAppend);
  }

    getTableList(ids: Array<number>) {
        if (ids.length == 0) return new Observable<Response<Array<AssumptionTable>>>();
        var stringToAppend = "";

        ids.forEach((id, index) => {
            stringToAppend += id
            if (index != ids.length - 1)
                stringToAppend += "&ids=";
        });

        
        return this.httpService
            .get(AppSettings.getAllTables + "?ids=" + stringToAppend, '', AppSettings.apiKey)
            .pipe(map(response => response));
    };

    getAllCategories() {
        return this.httpService
            .get(AppSettings.getAllCategories, '', AppSettings.apiKey)
            .pipe(map(response => response));
    };

    getAllTablesByCategoryID(categoryID) {
        return this.httpService
            .get(AppSettings.getAllTablesByCategoryID + categoryID, '', AppSettings.apiKey)
            .pipe(map(response => response));
    };

    saveRow(param){
      return this.httpService
            .post(AppSettings.saveRow, param, AppSettings.apiKey)
            .pipe(map((response) => response));
    }
    updateRow(param) {
        return this.httpService
            .put(AppSettings.saveRow, param, AppSettings.apiKey)
            .pipe(map((response) => response));
    }
    addTable(param) {
      return this.httpService
          .post(AppSettings.addTable, param, AppSettings.apiKey)
          .pipe(map((response) => response));
    }
    getTerms() {
        return this.httpService
            .get(AppSettings.getTerms, '', AppSettings.apiKey)
            .pipe(map(response => response));
    };
    getModels() {
        return this.httpService
            .get(AppSettings.getModels, '', AppSettings.apiKey)
            .pipe(map(response => response));
    };
}
