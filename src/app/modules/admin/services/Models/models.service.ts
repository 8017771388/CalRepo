import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Workflow } from '../../../_shared/models/workflow/workflow';
//import { EnvironmentService } from '../environment.service';
import { Response } from '../../../_shared/models/response';
import { AssumptionTableRows } from '../../../_shared/models/assumptiontables/assumption-table-rows';
import { WorkflowLookupTableRow } from '../../../_shared/models/workflow/workflowLookupTableRow';
import { map } from 'rxjs/operators';
import { HttpService } from '../../../_shared/services/http.services';
import { AppSettings } from '../../../_shared/constants/api-constant';

@Injectable({
  providedIn: 'root'
})
export class ModelsService {
  private baseUrl: string;

    constructor(private httpService: HttpService, private httpClient: HttpClient) {
    //this.baseUrl = env.baseUrl + "Workflow/";
   }

    public getModels(): Observable<Response<Workflow[]>> {
      var url = this.baseUrl;
      var observable = this.httpClient.get<Response<Workflow[]>>(url);
      return observable;
    };

    public Save(data: Workflow): Observable<Response<Workflow>> {
      var url = this.baseUrl;
      return this.httpClient.post<Response<Workflow>>(url, data);
    }

    public GetTableRelationShips(id: number): Observable<Response<Array<WorkflowLookupTableRow>>> {
      var url = this.baseUrl + "GetWorkflowTableRelationshipByTableID?id=" + id;
      return this.httpClient.get<Response<Array<WorkflowLookupTableRow>>>(url);
    }

    public UpsertWorkflowTableRows(items: Array<WorkflowLookupTableRow>): Observable<Response<boolean>> {
      var url = this.baseUrl + "UpsertWorkflowTableRows";
      return this.httpClient.post<Response<boolean>>(url, items);
    }
}
