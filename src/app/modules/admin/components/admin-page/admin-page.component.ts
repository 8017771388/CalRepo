

import { CommunicationService } from '../../../_shared/services/communication.services';

import { CurrencyPipe, DecimalPipe } from '@angular/common';
import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { stringify } from 'querystring';
import { Location } from "@angular/common";
import { Router, ActivatedRoute, Resolve } from "@angular/router";
//import Swal from 'sweetalert2';
//import { TaCalculatorForm } from 'src/app/models/ta-calculator-form';
//import { CalculatorService } from 'src/app/services/calculator.service';
//import { NgbInputDatepicker } from '@ng-bootstrap/ng-bootstrap';
//import { DataService } from 'src/app/services/Data/data.service';

@Component({
  selector: 'app-admin-page',
  templateUrl: './admin-page.component.html',
  styleUrls: ['./admin-page.component.scss']
})
export class AdminPageComponent implements OnInit {
  public currentTab : any;
  isClicked = [];
  menuItem = [
    //'Models',
    'Assumption Tables'   
    ]

    constructor(private communicationService: CommunicationService, private router: Router,
        private acRoute: ActivatedRoute,public location: Location) { 
     // this.currentTab = 'AdvisorProfile';
    }

  ngOnInit() { 
    //this.communicationService.hideNotiIcon();
    this.currentTab = 'Assumption Tables';
  }
  loadPage(pageName: string) {
      this.communicationService.contentPage.next(pageName);
   this.currentTab = pageName;
  

      //this.router.navigate(["/assumptiontables"]);
        //document.getElementById("mySidenav").style.width = "0";
        //document.getElementById("mySidenav").style.zIndex = "-1";
        //document.getElementById("mySidenav").style.position = "relative";
    }

    isActive(pageName: string) {
      return this.currentTab === pageName;
  };

  
}
