import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
//import { EnvironmentService } from '../environment.service';
import { Observable } from 'rxjs';
import { AssumptionTableRows } from '../../../_shared/models/assumptiontables/assumption-table-rows';
import { Response } from '../../../_shared/models/response';
import { addTableRowRequest } from '../../../_shared/models/assumptiontables/addTableRowRequest';
import { map } from 'rxjs/operators';
import { HttpService } from '../../../_shared/services/http.services';
import { AppSettings } from '../../../_shared/constants/api-constant';

@Injectable({
  providedIn: 'root'
})
export class AssumptionTableRowsService {

  private baseUrl: string;

    constructor(private httpService: HttpService,private httpClient: HttpClient) {
    //this.baseUrl = env.baseUrl;
   }

  public getTableRows(tableId : Number): Observable<Response<AssumptionTableRows[]>> {
    var url = this.baseUrl + "LookupTableRows/" + tableId;
    var observable = this.httpClient.get<Response<AssumptionTableRows[]>>(url);
    return observable;
  };

  public post(request: addTableRowRequest): Observable<Response<AssumptionTableRows>> {
    var url = this.baseUrl + "LookupTableRows/";
    var observable = this.httpClient.post<Response<AssumptionTableRows>>(url, request);
    return observable;
  }
}
