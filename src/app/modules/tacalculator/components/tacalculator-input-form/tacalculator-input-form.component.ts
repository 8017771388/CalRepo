
import { CurrencyPipe, DecimalPipe } from '@angular/common';
import { Component, OnInit, ViewChild, ElementRef, ChangeDetectorRef } from '@angular/core';
//import { NgForm } from '@angular/forms';
import * as AutoNumeric from 'autonumeric';
import { TAcalculatorService } from '../../services/tacalculator.service';
import { CommunicationService } from "../../../_shared/services/communication.services";
import { ApplicationRequest } from '../../../_shared/models/tacalculator/application-request';
import { LoaderService } from '../../../_shared/services/loader.service';
import Swal from 'sweetalert2';
import { FormsModule, NgForm } from "@angular/forms";
import { ReactiveFormsModule } from "@angular/forms";
import { AssumptiontableService } from '../../../admin/services/assumptiontable/assumptiontable.service';
import { UserInfo } from "../../../_shared/services/userInfo.service";
import { DxDataGridModule, DxSelectBoxModule } from 'devextreme-angular';
import 'devextreme/integration/jquery';


@Component({
  selector: 'app-tacalculator-input-form',
  templateUrl: './tacalculator-input-form.component.html',
  styleUrls: ['./tacalculator-input-form.component.scss']
})
export class TAcalculatorInputFormComponent implements OnInit {

    @ViewChild('newTAForm') public formTA: NgForm;
   
    @ViewChild("advisoryGdc") advisoryGdcElement: ElementRef;
  @ViewChild("brokerageGdc") brokerageGdcElement: ElementRef;
  @ViewChild("advisoryAum") advisoryAumElement: ElementRef;
  @ViewChild("mfsc") mfscElement: ElementRef;
  @ViewChild("mfsd") mfsdElement: ElementRef;
  @ViewChild("variableAnnuities") variableAnnuitiesElement: ElementRef;
  @ViewChild("fixedAnnuities") fixedAnnuitiesElement: ElementRef;
  @ViewChild("generalSecurities") generalSecuritiesElement: ElementRef;
  @ViewChild("fixedIncome") fixedIncomeElement: ElementRef;
  @ViewChild("cash") cashElement: ElementRef;
  @ViewChild("firmType")
    firmTypeElement: DxSelectBoxModule;
    public notFocuse: boolean = false;
    public notFocuseAdvGdc: boolean = false;
    public notFocuseBrkGdc: boolean = false;
    public notFocuseAdvAUM: boolean = false;
    public notFocuseMfsc: boolean = false;
    public notFocuseMfsd: boolean = false;
    public notFocuseVarAnnu: boolean = false;
    public notFocuseFixAnnu: boolean = false;
    public notFocuseGenSec: boolean = false;
    public notFocuseFixInc: boolean = false;
    public notFocuseAICash: boolean = false;
    public taForm: any = {};
    public terms: any = [];
    public models: any=[];
    public priorFirmTypes: any=[];
    public modelIDs= [];
    public termIds = [];
    public affiliationModel = [{
        name : 'Corp HOS',
        id: 1
    }];
    public noteTerm = [{
        name : '7 Years',
        id: 1
    }];

    public priorFirmTerm = [
        {
            name: "Incoming Financial Institutions (Tape)",
            id:1
        },
        {
            name: "Incoming Financial Institutions (Non-Tape)",
            id: 2
        },
        {
            name: "Independents",
            id: 3
        },
        {
            name: "Employee Advisor Experiment",
            id: 4
        },
        {
            name: "Wirehouses",
            id: 5

        },
        {
            name: "Regionals",
            id: 6
        },
        {
            name: "Insurance B/Ds",
            id: 7
        },
        {
            name: "Advisors coming from a bank",
            id: 8
        },
        {
            name: "Other",
            id: 9
        },
      
        
    ];
    public affiliationModelError : boolean = false;
    public noteTermError : boolean = false;
    //@ViewChild('newTAForm') form: HTMLFormElement;
    constructor(
        private userinfo: UserInfo,
        private currencyPipe: CurrencyPipe,
        private decimalPipe: DecimalPipe,
        private calculatorService: TAcalculatorService,
        private loader: LoaderService,
        private communicationService: CommunicationService, private cdr: ChangeDetectorRef, private assumptionTableService: AssumptiontableService
       
    ) {
        
        // this.communicationService.getOfferCalculateButton().subscribe(data => {
            
        //     if (data != null && data.calculateOfferButton == true){
                
        //         this.modelIDs = data.affModal != '' ? data.affModal : [];
        //         this.termIds = data.noteTerm != ''? data.noteTerm : [];
        //         data.calculateOfferButton = false
        //         console.log(this.taForm)
        //         this.CalculatePost();
        //         this.communicationService.setOfferCalculateButton(data);
        //     }
        // });
        this.communicationService.getOfferClearButton().subscribe(res => {
            if(res == true){
                this.onClear();
            }
        })
    }


    ngAfterViewChecked() {
        this.cdr.detectChanges();
        var calculated = "false";
        var response;
        this.communicationService.getOfferCalculateButton().subscribe(res => {
            //console.log(this.taForm);
            if(res != null){
                calculated = res.calculateOfferButton == true ? 'true' : 'false';
                response  = res;
                
            }
            // if (res != null && res.calculateOfferButton == true){
                
            //     this.modelIDs = res.affModal != '' ? res.affModal : [];
            //     this.termIds = res.noteTerm != ''? res.noteTerm : [];
            //     res.calculateOfferButton = false
            //     console.log(this.taForm)
            //     this.CalculatePost();
            //     this.communicationService.setOfferCalculateButton(res);
            // }
        })

        if(calculated == "true"){
            this.modelIDs = response.affModal != '' ? response.affModal : [];
                this.termIds = response.noteTerm != ''? response.noteTerm : [];
                response.calculateOfferButton = false
                //console.log(this.taForm)
                this.CalculatePost();
                this.communicationService.setOfferCalculateButton(response);
        }
       
        // this.communicationService.getOfferCalculateButton().subscribe(data => {
        //     //var _this = this;
        //     if (data != null && data.calculateOfferButton == true){
                
        //         this.modelIDs = data.affModal != '' ? data.affModal : [];
        //         this.termIds = data.noteTerm != ''? data.noteTerm : [];
        //         data.calculateOfferButton = false
        //         console.log(this.taForm)
        //         this.CalculatePost();
        //         this.communicationService.setOfferCalculateButton(data);
        //     }
        // });
        if(this.formTA.form.status.toLowerCase() == 'valid'){
            this.communicationService.setInputformValid(true)
        }
        else{
            this.communicationService.setInputformValid(false);
        }
        this.cdr.detectChanges();
    }

    ngAfterViewInit(){
        console.log(this.firmTypeElement)
    }

    ngOnInit(): void {
        //this.taForm.Prior_Firm_Type = "";
        // this.taForm.term_Ids = [3];
        // this.taForm.model_Ids = [1];
        //AutoNumeric.multiple('.commaSeparatedNoDecimal', null, { allowDecimalPadding: false });
        //AutoNumeric.multiple('.singleDecimal', null, { allowDecimalPadding: true, decimalPlaces: 1 });
        var ids = [1];
        this.communicationService.displayLoader(true);
        this.assumptionTableService.getTableList(ids).subscribe(resp => {
            this.communicationService.clearLoader();
            if (resp && resp["isSuccesful"]) {
                
                var table = resp["data"];
                if (table && table !== null && table.length>0) {
                    table[0].rows.forEach((row) => {
                        if (row.columnId == 1) {
                            var rampObj = {
                                priorFirmType: row.name,
                                rampPerc: row.value
                            };
                            this.priorFirmTypes.push(rampObj);
                        }
                        
                    });
                   
                }
               // console.log("priorFirmTypes", this.priorFirmTypes);
            }}
            ), (err => {
                this.communicationService.clearLoader();
              //  console.log("cannot load tables: ", err);
            })
       // this.getModels();
       // this.getTerms();
           
    }
    getTerms() {
        this.assumptionTableService.getTerms().subscribe(resp => {
            this.communicationService.clearLoader();
            if (resp && resp["isSuccesful"]) {               
                if (resp["data"] && resp["data"] !== null && resp["data"].length > 0) {             
                    this.terms = resp["data"];
                }
                // console.log("priorFirmTypes", this.priorFirmTypes);
            }
        }
        ), (err => {
            this.communicationService.clearLoader();
            //  console.log("cannot load tables: ", err);
        })
       
    }
    getModels() {
        this.assumptionTableService.getModels().subscribe(resp => {
            this.communicationService.clearLoader();
            if (resp && resp["isSuccesful"]) {
                if (resp["data"] && resp["data"] !== null && resp["data"].length > 0) {
                    this.models = resp["data"];
                }
                // console.log("priorFirmTypes", this.priorFirmTypes);
            }
        }
        ), (err => {
            this.communicationService.clearLoader();
            //  console.log("cannot load tables: ", err);
        })
        
    }
    onClear() {
        this.formTA.reset();
        this.taForm = {};
        this.taForm.Prior_Firm_Type = ""
        this.communicationService.setMainContentFlag(false);
        window.scroll({
            top: 0, 
            left: 0, 
            behavior: 'smooth' 
        });
    }
    valueChanged(newValue, field){
        //console.log(Number(newValue))
        if (!(newValue === null || newValue === '' || newValue === undefined))
          newValue = newValue.replace(/,/g, "");
        //if (fieldName === "valuationMidPoint") {
            if (newValue == "" ) {
                this.taForm[field] = null;
            }
            else {
               // this.taForm[field] = Number(newValue).toLocaleString();
               // console.log('Number(newValue)', Number(newValue).toLocaleString())
                if (isNaN(Number(newValue)) == false) {
                    this.taForm[field] = Number(newValue).toLocaleString();
                }
                else {
                    this.taForm[field] = newValue;
                }
            }
        //}
        
    }

    public CalculateVAUMTotal(): void {
        var brokerage = this.stripNumber(this.taForm.Brokerage_dollar);
        var advisory = this.stripNumber(this.taForm.Advisory_dollar);

        var sum = brokerage + advisory;
        
        this.taForm.VAUM = sum == null ? sum : Number(sum).toLocaleString();
        //this.taForm.VAUM = AutoNumeric.format(sum, { allowDecimalPadding: false });

        this.CalculateEAUMTotal();
        this.CalculateGDCROA();
        this.CalculateAdvisoryPercent();
        this.CalculateBrokeragePercent();
       
    }

    public CalculateEAUMTotal(): void {
        var rampPerc = this.priorFirmTypes.length > 0 ? (this.priorFirmTypes.filter(el => el.priorFirmType == this.taForm.Prior_Firm_Type)) : null;
       
        //console.log("r", rampPerc);
        this.taForm.Ramp = (rampPerc != undefined && rampPerc != null && rampPerc.length > 0) ? rampPerc[0].rampPerc: "0";
        var vaum = this.stripNumber(this.taForm.VAUM);
        var ramp = this.stripNumber(this.taForm.Ramp);

        var eaum = vaum * ramp/100;
        this.taForm.EAUM = eaum == null ? eaum : Number(eaum).toLocaleString();
        //this.taForm.EAUM = AutoNumeric.format(eaum, { allowDecimalPadding: false });
        
    }

    public CalculateT12GDCTotal(): void {
        var advisory = this.stripNumber(this.taForm.T12_Advisory_GDC);
        var brokerage = this.stripNumber(this.taForm.T12_Brokerage_GDC);

        var t12Gdc = advisory + brokerage;
        this.taForm.T12_GDC = t12Gdc == null ? t12Gdc : Number(t12Gdc).toLocaleString();
        //this.taForm.T12_GDC = AutoNumeric.format(t12Gdc, { allowDecimalPadding: false });
        this.CalculateGDCROA();

        this.CalculateAdvisoryPercent();
        this.CalculateBrokeragePercent();
       
    }

    public CalculateAdvisoryPercent(): void {
        var advisory = this.stripNumber(this.taForm.Advisory_dollar);
        var vaum = this.stripNumber(this.taForm.VAUM);

        if (vaum === 0) vaum = 1;

        var advPercent = this.BreakPercentage(advisory, vaum);
        this.taForm.Advisory_percentage = advPercent
        //this.taForm.Advisory_percentage = AutoNumeric.format(advPercent, { allowDecimalPadding: true, decimalPlaces: 1 });
        
    }

    public CalculateBrokeragePercent(): void {
        //console.log("calculate brokerage percent");
        var brokerage = this.stripNumber(this.taForm.Brokerage_dollar);
        var vaum = this.stripNumber(this.taForm.VAUM);

        if (vaum === 0) vaum = 1;

        var brokeragePercent = this.BreakPercentage(brokerage, vaum);
       // console.log(brokerage, vaum, brokeragePercent)
        this.taForm.Brokerage_percentage = brokeragePercent
        //this.taForm.Brokerage_percentage = AutoNumeric.format(brokeragePercent, { allowDecimalPadding: true, decimalPlaces: 1 });
    }

    public CalculateGDCROA(): void {
        var t12gdc = this.stripNumber(this.taForm.T12_GDC);
        var vaum = this.stripNumber(this.taForm.VAUM);
        if (vaum === 0) vaum = 1;
        var roa = (t12gdc / vaum) * 10000;

        if (isNaN(roa)) roa = 0;

        this.taForm.GDC_ROA = roa.toFixed(1);

        //this.taForm.GDC_ROA = AutoNumeric.format(roa, { allowDecimalPadding: true, decimalPlaces: 1 });
        
    }

    public CalculateBrokerageDollar(): void {
        var mfsCustodied = this.stripNumber(this.taForm.MFs_Custodied_dollar);
        var mfsDirect = this.stripNumber(this.taForm.MFs_Direct_dollar);
        var variableAnnuities = this.stripNumber(this.taForm.Variable_Annuities_dollar);
        var fixedAnnuities = this.stripNumber(this.taForm.Fixed_Annuities_dollar);
        var generalSecurities = this.stripNumber(this.taForm.General_Securities_dollar);
        var fixedIncome = this.stripNumber(this.taForm.Fixed_Income_dollar);
        var auisUITsCash = this.stripNumber(this.taForm.AIs_UIT_Cash_dollar);

        var brokerage = mfsCustodied + mfsDirect + variableAnnuities + fixedAnnuities + generalSecurities + fixedIncome + auisUITsCash;
        this.taForm.Brokerage_dollar = Number(brokerage).toLocaleString();
        var advisory = this.stripNumber(this.taForm.Advisory_dollar);
        var vaum = advisory + brokerage;
        console.log('vaum', vaum);
        //console.log("mfsCustodied", this.taForm.MFs_Custodied_dollar);
       // console.log("Totalbrokerage", brokerage);
       // this.taForm.Brokerage_dollar = AutoNumeric.format(brokerage, { allowDecimalPadding: false });

        this.CalculateVAUMTotal();
        this.CalculateBrokeragePercent();

        this.taForm.MFs_Custodied_percentage = this.BreakPercentage(mfsCustodied, vaum);
        this.taForm.MFs_Direct_percentage = this.BreakPercentage(mfsDirect, vaum);
        this.taForm.Variable_Annuities_percentage = this.BreakPercentage(variableAnnuities, vaum);
        this.taForm.Fixed_Annuities_percentage = this.BreakPercentage(fixedAnnuities, vaum);
        this.taForm.General_Securities_percentage = this.BreakPercentage(generalSecurities, vaum);
        this.taForm.Fixed_Income_percentage = this.BreakPercentage(fixedIncome, vaum);
        this.taForm.AIs_UIT_Cash_percentage = this.BreakPercentage(auisUITsCash, vaum);
        
    }

    private BreakPercentage(part: number, whole: number): number {
        if (whole === 0) whole = 1;
        var percentage = part / whole * 100
        var roundedNumber = Math.round(percentage * 10) / 10
        return roundedNumber;
    }
    

    public CalculatePost(): void {
        console.log(this.taForm)
        if (this.taForm.No_of_Advisors != null) {
            var req = new ApplicationRequest();

            //setTimeout(() => {
            //    window.scroll({
            //        top: 0, 
            //        left: 0, 
            //        behavior: 'smooth' 
            //    });

            //}, 800);
            req.userName = this.userinfo.getUserName();

            req.aIs_UIT_Cash_dollar = this.stripNumber(this.taForm.AIs_UIT_Cash_dollar);
            req.aIs_UIT_Cash_percentage = this.taForm.AIs_UIT_Cash_percentage ? parseFloat(this.taForm.AIs_UIT_Cash_percentage) : 0;
            req.advisor_Team_Name = this.taForm.Advisor_Team_Name;
            req.advisory_dollar = this.stripNumber(this.taForm.Advisory_dollar);
            req.advisory_percentage = parseFloat(this.taForm.Advisory_percentage);
            req.brokerage_dollar = this.stripNumber(this.taForm.Brokerage_dollar);
            req.brokerage_percentage = parseFloat(this.taForm.Brokerage_percentage);
            req.eaum = this.stripNumber(this.taForm.EAUM);
            req.fixed_Annuities_dollar = this.stripNumber(this.taForm.Fixed_Annuities_dollar);
            req.fixed_Annuities_percentage = this.taForm.Fixed_Annuities_percentage ? parseFloat(this.taForm.Fixed_Annuities_percentage) : 0;
            req.fixed_Income_dollar = this.stripNumber(this.taForm.Fixed_Income_dollar);
            req.fixed_Income_percentage = this.taForm.Fixed_Income_percentage ? parseFloat(this.taForm.Fixed_Income_percentage) : 0;
            req.gdC_ROA = parseFloat(this.taForm.GDC_ROA);
            req.general_Securities_dollar = this.stripNumber(this.taForm.General_Securities_dollar);
            req.general_Securities_percentage = this.taForm.General_Securities_percentage ? parseFloat(this.taForm.General_Securities_percentage) : 0;
            req.mFs_Custodied_dollar = this.stripNumber(this.taForm.MFs_Custodied_dollar);
            req.mFs_Custodied_percentage = this.taForm.MFs_Custodied_percentage ? parseFloat(this.taForm.MFs_Custodied_percentage) : 0;
            req.mFs_Direct_dollar = this.stripNumber(this.taForm.MFs_Direct_dollar);
            req.mFs_Direct_percentage = this.taForm.MFs_Direct_percentage ? parseFloat(this.taForm.MFs_Direct_percentage) : 0;
            req.no_of_Advisors = parseInt(this.taForm.No_of_Advisors);
            req.prior_Firm_Name = this.taForm.Prior_Firm_Name;
            req.prior_Firm_Type = this.taForm.Prior_Firm_Type;
            req.t12_Advisory_GDC = this.stripNumber(this.taForm.T12_Advisory_GDC);
            req.t12_Brokerage_GDC = this.stripNumber(this.taForm.T12_Brokerage_GDC);
            req.t12_GDC = this.taForm.T12_GDC;
            req.vaum = this.stripNumber(this.taForm.VAUM);
            req.variable_Annuities_dollar = this.stripNumber(this.taForm.Variable_Annuities_dollar);
            req.variable_Annuities_percentage = this.taForm.Variable_Annuities_percentage ? parseFloat(this.taForm.Variable_Annuities_percentage) : 0;
            req.ramp = parseFloat(this.taForm.Ramp);
            req.model_Ids = this.modelIDs;
            req.term_Ids = this.termIds;
            req.crd = this.taForm.Advisor_CRD;
            req.osj = this.taForm.Advisor_OSJ;

            this.communicationService.setMainContentFlag(true);
            console.log('req', this.taForm);

            this.loader.show("Calculating Offers....", "Please wait");

            this.calculatorService.createOffer(req).subscribe(
                response => {
                    this.loader.hide();

                    if (response && response["isSuccesful"] == true) {
                        let inputFormData = JSON.parse(JSON.stringify(this.taForm))
                        this.communicationService.setOfferInputData(inputFormData);
                        this.communicationService.setcalculatedOfferResponse(response["data"]);
                        var offerData = response["data"];
                        Swal.fire({
                            title: 'Success!', text: 'Saved Successfully!', icon: 'success', backdrop: false,
                            heightAuto: false, showConfirmButton: false,
                            timer: 1500, onAfterClose: () => window.scrollTo(0, 0)
                        });

                        var plReportParam = {
                            offerId: offerData[0].offerId
                        }
                        //this.calculatorService.getTableDataType().subscribe(result => {
                        //    let tableDataType = [];
                        //    if(result["isSuccesful"] == true){
                        //      var datatype = result["data"];
                        //      datatype.forEach(element => {
                        //        tableDataType[element.id] = element.name;
                        //      });
                        //      console.log(tableDataType)
                        //      this.communicationService.setDataType(tableDataType);
                        //    };
                        //  })
                        this.calculatorService.getProfitLoss(plReportParam).subscribe(res => {
                            if (res["isSuccesful"] == true) {
                                var plRes = res["data"];

                                this.communicationService.setPandLReport(plRes);
                            }
                        });
                        this.calculatorService.getOfferCriteria(offerData[0].offerId,"").subscribe(res => {
                            if (res["isSuccesful"] == true) {
                                var offerCriteria = res["data"];

                                this.communicationService.setOfferCriteria(offerCriteria);
                            }
                        })
                    }
                    else {
                        this.communicationService.setcalculatedOfferResponse(null);
                        this.communicationService.setPandLReport(null);
                        this.communicationService.setOfferCriteria(null);
                        Swal.fire({ title: 'Error Occured!', text: "The TA Calculator is unavailable at this time.  Please try again later.", icon: 'error', onAfterClose: () => window.scrollTo(0, 0) })

                    }
                }, (err) => {
                    this.loader.hide();
                    //Swal.fire({ title: 'Error Occured!', text: response["message"], icon: 'error', onAfterClose: () => window.scrollTo(0, 0) })
                    Swal.fire({ title: '', text: "The TA Calculator is unavailable at this time.  Please try again later.", icon: 'error', onAfterClose: () => window.scrollTo(0, 0) })
                    this.communicationService.setPandLReport(null);
                    this.communicationService.setOfferCriteria(null);
                    setTimeout(() => {
                        window.scroll({
                            top: 0,
                            left: 0,
                            behavior: 'smooth'
                        });

                    }, 800);
                }
            )
        }
        
        
      
    };


    private stripNumber(input): number {
         var data = 0;
       // console.log("input", input);
        if (input != undefined) {
            if (!isNaN(input)) {
              //  console.log("number");
                data = parseInt(input);
            }
            else {
              //  console.log("comma");
                var number = input.replace(/,/g, '');
                if (!isNaN(parseInt(number))) {
                    data = parseInt(number);
                }
            }
         }
        //console.log("output", data);
        return data;
    }

    checkValueAum(event) {
       console.log('event------', event);
        if (
          (event.keyCode > 47 && event.keyCode < 58) ||
          (event.keyCode > 95 && event.keyCode < 106) ||
          (event.ctrlKey || event.metaKey) && event.keyCode == 67 ||
          
          (event.ctrlKey || event.metaKey) && event.keyCode == 86 ||
          (event.ctrlKey || event.metaKey) && event.keyCode == 65 ||
          event.keyCode === 8 ||
          event.keyCode ===  9 
         
        ) {
            
            var rawValue = event.target.value;
            rawValue = rawValue.replace(/,/g, "");
            return true;
            
        } else {
            if(event.key == 'Shift'){
                return false;
            }
            if (event.keyCode == 46) {
                return true;
            }
            if (event.keyCode == 16) {
                return false;
            }
            return false;
        }
      }

      nan(value){
        if (!(value == null || value == '' || value == undefined)){
            value = value.replace(/,/g, "");
            return isNaN(Number(value))
        }
        else{
            return false;
        }
          
      }

      onValueChanged(event){
         
          if (event.value != null && event.value.length <= 0) {
            this.affiliationModelError = true;
        }
        else{
            this.affiliationModelError = false;
        }
          
      }
    focusIn() {
        this.affiliationModelError = false;
        
    };
    focusOut() {
        
        if (this.taForm.affiliationModel && this.taForm.affiliationModel != null && this.taForm.affiliationModel.length>0) {
            this.affiliationModelError = false;
        }
        else {
            this.affiliationModelError = true;
        }
    }

      onNTChanged(event){
            
        // if(event.value.length <= 0){
        //     this.noteTermError = true;
        // }
        // else{
        //     this.noteTermError = false;
        // }
        }

    ngOnDestroy(){
       
        this.communicationService.setcalculatedOfferResponse(null);
        this.communicationService.setPandLReport(null);
        this.communicationService.setOfferCriteria(null);
    }
        
     
}
