import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Workflow } from '../../../_shared/models/workflow/workflow';
//import { EnvironmentService } from '../environment.service';
import { Response } from '../../../_shared/models/response';
import { PackageGroups } from '../../../_shared/models/packageGroups/package-groups';
import { PackageGroupAssignments } from '../../../_shared/models/packageGroups/package-group-assignments'
import { map } from 'rxjs/operators';
import { HttpService } from '../../../_shared/services/http.services';
import { AppSettings } from '../../../_shared/constants/api-constant';


@Injectable({
  providedIn: 'root'
})
export class PackageGroupService {

  private baseUrl: string;

    constructor(private httpService: HttpService, private httpClient: HttpClient) {
    //this.baseUrl = env.baseUrl + "WorkflowGroup/";
   }

    public getWorkflowGroups(): Observable<Response<PackageGroups[]>> {
      var url = this.baseUrl;
      var observable = this.httpClient.get<Response<PackageGroups[]>>(url);
      return observable;
    };

    public getPackageGroupAssignmentRowsBypackageId(Id : number): Observable<Response<PackageGroupAssignments[]>> {
      var url = this.baseUrl + 'GetByWorkflowgroupId?workflowgroupId=' + Id;
      var observable = this.httpClient.get<Response<PackageGroupAssignments[]>>(url);
      return observable;
    };

    public getActiveDropdownValues() {
      return [
        { id: 'true', name: 'Yes' },
        { id: 'false', name: 'No' }
      ];
    }

    public Save(data: PackageGroups): Observable<Response<PackageGroups>> {
      var url = this.baseUrl + 'UpsertWorkflowGroup';
      return this.httpClient.post<Response<PackageGroups>>(url, data);
    }
}
