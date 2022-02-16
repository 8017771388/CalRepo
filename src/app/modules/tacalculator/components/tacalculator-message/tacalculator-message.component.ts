import { CurrencyPipe, DecimalPipe } from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import * as AutoNumeric from 'autonumeric';
import { TAcalculatorService } from '../../services/tacalculator.service';
import { CommunicationService } from "../../../_shared/services/communication.services";
import { ApplicationRequest } from '../../../_shared/models/tacalculator/application-request';
import { LoaderService } from '../../../_shared/services/loader.service';
import Swal from 'sweetalert2';
import { UserInfo } from "../../../_shared/services/userInfo.service";
import { AssumptiontableService } from '../../../admin/services/assumptiontable/assumptiontable.service';
import { MODEL, TERM } from '../../../_shared/constants/global.constant';


@Component({
  selector: 'app-tacalculator-message',
  templateUrl: './tacalculator-message.component.html',
  styleUrls: ['./tacalculator-message.component.scss']
})
export class TacalculatorMessageComponent implements OnInit {
    public mainContentFlag: any;
    public userType: any;
    public currentTab: any;
    public currentSubTab: any;
    public offerRes: any = null;
    
    public models = MODEL;
    public terms = TERM;
    public modelTermC: any=[];
    public modelId: any;
    public isPnLEnabled: boolean=true;
    constructor(private communicationService: CommunicationService,
        private userInfo: UserInfo, private assumptionTableService: AssumptiontableService) {
            this.communicationService.getOfferClearButton().subscribe(data => {
                
                this.isPnLEnabled = data == true ? true : false;
               
            })
            this.communicationService.getModelTermComboPL().subscribe(modelTerm => {
                if(modelTerm != null){
                    this.modelTermC = modelTerm;
                    this.getModels();
                }
            })
         }

    ngOnInit(): void {
        this.currentTab = "Offers";
        this.currentSubTab = 1;
        this.userType = this.userInfo.getUserRole();
        console.log("this.userType", this.userType);
        this.communicationService
            .getMainContentFlag()
            .subscribe((mainContentFlg) => {
                this.mainContentFlag = mainContentFlg;
                console.log(this.mainContentFlag);
            });

        this.communicationService.getcalculatedOfferResponse().subscribe(data => {
            this.offerRes = data;
            this.offerRes !== null ? this.isPnLEnabled = false : this.isPnLEnabled = true;
            console.log("this.offerRes", this.offerRes);
        });

        this.communicationService.getModelTermComboPL().subscribe(modelTerm => {
            if(modelTerm != null){
                this.modelTermC = modelTerm;                
            }
        })
        
        this.getModels();
        console.log("this.isPnLEnabled", this.isPnLEnabled);
    }
    getModels() {       
        if(this.modelTermC.length > 0){

            this.models.forEach(element => {
                            
                this.modelTermC.forEach(el => {
                    if(el.modelId == element.id){
                        el['modelName'] = element.name;
                        el['name'] = element.name;
                    }
                })
            });

            this.terms.forEach(element => {
                // if(element.name == this.currentSubTab){
                //     this.modelId = element;
                // }
                this.modelTermC.forEach(el => {
                    if(el.termId == element.id){
                        el['termName'] = element.name;
                        el['name'] = el['name'] +" "+ element.name;
                    }
                })
            });          

           //setTimeout(() => {
                this.modelTermC.forEach((mt,index) => {
                    index = index +1;
                    //mt['name'] = mt.modelName + " " + mt.termName;
                    if(index == this.currentSubTab){
                        this.modelId = mt;
                    }
                });
                console.log(this.modelTermC)
           //}, 50);           

            
        }
    }
    plTabId(model){

        this.modelId = model;
        console.log("modelIdmodelIdmodelId", this.modelId);

    }

}
