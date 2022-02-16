import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
//import {  Observable } from 'rxjs';
import { map } from "rxjs/operators";
import { HttpService } from "../../_shared/services/http.services";
import { AppSettings } from "../../_shared/constants/api-constant";

@Injectable({
    providedIn: "root",
})
export class HomeService {
    constructor(private httpService: HttpService, private http: HttpClient) {}

  
    
}
