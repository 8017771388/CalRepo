import { Component, OnInit } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { CommunicationService } from '../../services/communication.services';
import { HistoryService } from '../../../history/services/history.service';
import { TAcalculatorService } from '../../../tacalculator/services/tacalculator.service';
import { MODEL, TERM } from '../../constants/global.constant';
import { CurrencyPipe } from '@angular/common';
import jsPDF from 'jspdf';
import * as _html2canvas from "html2canvas";
import { filter } from 'rxjs-compat/operator/filter';
const html2canvas: any = _html2canvas;

@Component({
  selector: 'app-history-offer',
  templateUrl: './history-offer.component.html',
  styleUrls: ['./history-offer.component.scss']
})
export class HistoryOfferComponent implements OnInit {

  public inputData:any;
  public offerId: any;
  public outputOffer:any=[];
  public plData:any;
  public title:any;
  public today = new Date();
  public blankOfferOutput: any;
  public model = MODEL;
  public term = TERM;
  public firstColumn : boolean = false;
  public secondColumn : boolean = false;
  public thirdColumn : boolean = false;

  constructor(public bsModalRef: BsModalRef, private cs : CommunicationService, public hs : HistoryService, public taCS : TAcalculatorService, private currencyPipe: CurrencyPipe) { }

  ngOnInit(): void {
    this.cs.displayLoader(true);
    this.hs.getOfferHistoryInput(this.offerId).subscribe(res => {
      
      if(res["isSuccesful"] == true){
        this.inputData = res["data"][0];
        let advisory = this.stripNumber(this.inputData.t12AdvisoryGDC);
        let brokerage = this.stripNumber(this.inputData.t12BrokerageGDC);

        let t12Gdc = advisory + brokerage;
        this.inputData["t12GDCTotal"] = t12Gdc == null ? t12Gdc : Number(t12Gdc);
        console.log(this.inputData["t12GDCTotal"])
               
        this.inputData.t12AdvisoryGDC = this.inputData.t12AdvisoryGDC != null &&  this.inputData.t12AdvisoryGDC != 0? this.currencyPipe.transform(this.inputData.t12AdvisoryGDC, 'USD', '$', '1.0-0') : this.inputData.t12AdvisoryGDC;

        this.inputData.t12BrokerageGDC = this.inputData.t12BrokerageGDC != null && this.inputData.t12BrokerageGDC != 0 ? this.currencyPipe.transform(this.inputData.t12BrokerageGDC, 'USD', '$', '1.0-0') : this.inputData.t12BrokerageGDC;

        this.inputData.variableAnnuitiesValue = this.inputData.variableAnnuitiesValue != null && this.inputData.variableAnnuitiesValue != 0 ? this.currencyPipe.transform(this.inputData.variableAnnuitiesValue, 'USD', '$', '1.0-0') : this.inputData.variableAnnuitiesValue;

        this.inputData.fixedIncomeValue = this.inputData.fixedIncomeValue != null && this.inputData.fixedIncomeValue != 0 ? this.currencyPipe.transform(this.inputData.fixedIncomeValue, 'USD', '$', '1.0-0') : this.inputData.fixedIncomeValue;

        this.inputData.vaum = this.inputData.vaum != null && this.inputData.vaum != 0 ? this.currencyPipe.transform(this.inputData.vaum, 'USD', '$', '1.0-0') : this.inputData.vaum;

        this.inputData.t12GDCTotal = this.inputData.t12GDCTotal != null && this.inputData.t12GDCTotal != 0 ? this.currencyPipe.transform(this.inputData.t12GDCTotal, 'USD', '$', '1.0-0') : this.inputData.t12GDCTotal;

        this.inputData.brokerageAUMValue = this.inputData.brokerageAUMValue != null && this.inputData.brokerageAUMValue != 0 ? this.currencyPipe.transform(this.inputData.brokerageAUMValue, 'USD', '$', '1.0-0') : this.inputData.brokerageAUMValue;

        this.inputData.fixedAnnuitiesValue = this.inputData.fixedAnnuitiesValue != null && this.inputData.fixedAnnuitiesValue != 0 ? this.currencyPipe.transform(this.inputData.fixedAnnuitiesValue, 'USD', '$', '1.0-0') : this.inputData.fixedAnnuitiesValue;

        this.inputData.aIsUITCashValue = this.inputData.aIsUITCashValue != null && this.inputData.aIsUITCashValue != 0 ? this.currencyPipe.transform(this.inputData.aIsUITCashValue, 'USD', '$', '1.0-0') : this.inputData.aIsUITCashValue;

        this.inputData.mFsCustodiedValue = this.inputData.mFsCustodiedValue != 0 ? this.currencyPipe.transform(this.inputData.mFsCustodiedValue, 'USD', '$', '1.0-0') : this.inputData.mFsCustodiedValue;

        this.inputData.eaum = this.inputData.eaum != null && this.inputData.eaum != 0 ? this.currencyPipe.transform(this.inputData.eaum, 'USD', '$', '1.0-0') : this.inputData.eaum;

        this.inputData.mFsDirectValue = this.inputData.mFsDirectValue != null && this.inputData.mFsDirectValue != 0 ? this.currencyPipe.transform(this.inputData.mFsDirectValue, 'USD', '$', '1.0-0') : this.inputData.mFsDirectValue;

        this.inputData.generalSecuritiesValue = this.inputData.generalSecuritiesValue != null && this.inputData.generalSecuritiesValue != 0 ? this.currencyPipe.transform(this.inputData.generalSecuritiesValue, 'USD', '$', '1.0-0') : this.inputData.generalSecuritiesValue;

        this.inputData.advisoryAUMValue = this.inputData.advisoryAUMValue != null && this.inputData.advisoryAUMValue != 0 ? this.currencyPipe.transform(this.inputData.advisoryAUMValue, 'USD', '$', '1.0-0') : this.inputData.advisoryAUMValue;

        this.inputData.gdcroa = this.inputData.gdcroa != null ? this.inputData.gdcroa.toFixed(1) : this.inputData.gdcroa;

        this.inputData.ramp = this.inputData.ramp != null ? Number(this.inputData.ramp)*100 : this.inputData.ramp;
        // this.inputData.advisoryAUMpercentage = Math.round(this.inputData.advisoryAUMpercentage);
        // this.inputData.brokerageAUMPercentage = Math.round(this.inputData.brokerageAUMPercentage);
        // this.inputData.mFsCustodiedPercentage = Math.round(this.inputData.mFsCustodiedPercentage);
        // this.inputData.mFsDirectPercentage = Math.round(this.inputData.mFsDirectPercentage);
        // this.inputData.variableAnnuitiesPercentage = Math.round(this.inputData.variableAnnuitiesPercentage);
        // this.inputData.fixedAnnuitiesPercentage = Math.round(this.inputData.fixedAnnuitiesPercentage);
        // this.inputData.generalSecuritiesPercentage = Math.round(this.inputData.generalSecuritiesPercentage);
        // this.inputData.fixedIncomePercentage = Math.round(this.inputData.fixedIncomePercentage);
        // this.inputData.aIsUITCashPercentage = Math.round(this.inputData.aIsUITCashPercentage);
      }
    });

    if(localStorage.getItem('offerOutput') == null){
      this.taCS.getOfferOutput().subscribe((res) => {
        if(res["isSuccesful"] == true){
          this.blankOfferOutput = res["data"]
          
          localStorage.setItem('offerOutput', JSON.stringify({timestamp : new Date(), data : this.blankOfferOutput}));

          this.setOfferObj();
          
        }
        else{
          this.cs.displayLoader(false);
        }
      }, err=> {
        this.cs.displayLoader(false)
      })
    } 
    else{
      var localData = JSON.parse(localStorage.getItem('offerOutput'));
      let ts = new Date(localData.timestamp);
      let today = new Date();
      //console.log((today.getTime() - ts.getTime()) / (1000 * 3600 * 24))
      if((today.getTime() - ts.getTime()) / (1000 * 3600 * 24) > 1){
        localStorage.removeItem('offerOutput');
        this.taCS.getOfferOutput().subscribe((res) => {
          if(res["isSuccesful"] == true){
            this.blankOfferOutput = res["data"]
            
            localStorage.setItem('offerOutput', JSON.stringify({timestamp : new Date(), data : this.blankOfferOutput}));
  
            this.setOfferObj();
            
          }
          else{
            this.cs.displayLoader(false);
          }
        }, err => {
          this.cs.displayLoader(false)
        })
      }
      else{
        this.blankOfferOutput = localData.data;
        this.setOfferObj();
      }

    } 
    
  }

  setOfferObj(){
    this.cs.displayLoader(true);
    this.hs.getOfferHistoryOutput(this.offerId).subscribe(res => {
      
      let filteredData=[];
      
      if(res["isSuccesful"] == true){
        let response = res["data"];
        this.blankOfferOutput.forEach(element => {
          filteredData.push(response.filter(ele=>ele.rowName == element.rowName));
          
        });
       

        filteredData.forEach((row,i)=> {
          var rowOne={};          
          row.forEach((element,index) => {
            if(index == 0){
              rowOne['rowName'] = element.rowName
              rowOne['modelId'] = element.modelId
              rowOne['termId'] = element.termId
              rowOne['offerId'] = element.offerId
              rowOne['offerDataType'] = element.offerDataType
              rowOne['value1'] = element.offerOutputValue

              if(i==0){
                let modelName;
                let termName;
                this.firstColumn = true;
                this.model.forEach(model => {
                  if(model.id == element.modelId){
                    modelName = model.name;
                  }
                })
                this.term.forEach(term => {
                  if(term.id == element.termId){
                    termName = term.name
                  }
                })
                this.outputOffer.push({
                  rowName:'Affiliation Model',
                  value1:modelName
                })
                this.outputOffer.push({
                  rowName:'Note Term',
                  value1:termName
                })
                this.outputOffer.push({
                  rowName:'Metric',
                  value1:modelName + " " + termName
                })
              }
            }
            if(index == 1){

              rowOne['value2'] = element.offerOutputValue;

              if(i ==0){
                let modelName;
                let termName;
                this.secondColumn = true;
                this.model.forEach(model => {
                  if(model.id == element.modelId){
                    modelName = model.name;
                  }
                })
                this.term.forEach(term => {
                  if(term.id == element.termId){
                    termName = term.name
                  }
                })
              
              this.outputOffer.forEach(oo => {
                if(oo.rowName == 'Affiliation Model'){
                  oo['value2'] = modelName
                }
                if(oo.rowName == 'Note Term'){
                  oo['value2'] = termName
                }
                if(oo.rowName == 'Metric'){
                  oo['value2'] = modelName + " " + termName
                }
              });
              }
            }
            if(index == 2){
              rowOne['value3'] = element.offerOutputValue
              
              if(i == 0){
                let modelName;
                let termName;
                this.thirdColumn = true;
                this.model.forEach(model => {
                  if(model.id == element.modelId){
                    modelName = model.name;
                  }
                })
                this.term.forEach(term => {
                  if(term.id == element.termId){
                    termName = term.name
                  }
                })
             
                this.outputOffer.forEach(oo => {
                  if(oo.rowName == 'Affiliation Model'){
                    oo['value3'] = modelName
                  }
                  if(oo.rowName == 'Note Term'){
                    oo['value3'] = termName
                  }
                  if(oo.rowName == 'Metric'){
                    oo['value3'] = modelName + " " + termName
                  }
                });
              }
            }
          });
          this.outputOffer.push(rowOne);
        })
        console.log(this.outputOffer)
      }

      this.outputOffer.forEach(offer => {
        if(offer.rowName != 'Affiliation Model' && offer.rowName != 'Note Term' && offer.rowName != 'Metric'){
          if (offer.offerDataType.toLowerCase() == 'bps') {

            if(offer.value1 != undefined){
              offer.value1 = offer.value1 != null ? offer.value1.toFixed(1) + 'bps' : offer.value1;
            }
            if(offer.value2 != undefined){
              offer.value2 = offer.value2 != null ? offer.value2.toFixed(1) + 'bps' : offer.value2;
            } 
            if(offer.value3 != undefined){
              offer.value3 = offer.value3 != null ? offer.value3.toFixed(1) + 'bps' : offer.value3;
            }    
            
          }
          else if (offer.offerDataType.toLowerCase() == 'percent') {
            if(offer.value1 != undefined){
              offer.value1 = offer.value1 != null ? (offer.value1*100).toFixed(1) + '%' : offer.value1;
            }
            if(offer.value2 != undefined){
              offer.value2 = offer.value2 != null ? (offer.value2*100).toFixed(1) + '%' : offer.value2;
            } 
            if(offer.value3 != undefined){
              offer.value3 = offer.value3 != null ? (offer.value3*100).toFixed(1) + '%' : offer.value3;
            } 
              
              
          }
            else if (offer.offerDataType.toLowerCase() == 'months') {
              if(offer.value1 != undefined){
                offer.value1 = offer.value1 != null ? offer.value + 'months' : offer.value1;
              }
              if(offer.value2 != undefined){
                offer.value2 = offer.value2 != null ? offer.value2 + 'months' : offer.value2;
              } 
              if(offer.value3 != undefined){
                offer.value3 = offer.value3 != null ? offer.value3 + 'months' : offer.value3;
              } 
              
          }
            else if (offer.offerDataType.toLowerCase() == 'dollars') {
              if(offer.value1 != undefined){
                offer.value1 = offer.value1 != null ? this.currencyPipe.transform(offer.value1, 'USD', '$', '1.0-0') : offer.value1;
              }
              if(offer.value2 != undefined){
                offer.value2 = offer.value2 != null ? this.currencyPipe.transform(offer.value2, 'USD', '$', '1.0-0') : offer.value2;
              } 
              if(offer.value3 != undefined){
                offer.value3 = offer.value3 != null ? this.currencyPipe.transform(offer.value3, 'USD', '$', '1.0-0') : offer.value3;
              } 
              
              
          }
        }
      });
      this.cs.displayLoader(false)
    })
  }

  // public BreakPercentage(part: number, whole: number): number {
  //   if (whole === 0) whole = 1;
  //   var percentage = part / whole * 100
  //   var roundedNumber = Math.round(percentage * 10) / 10
  //   return roundedNumber;
  // }

  dateFormat(date) {
    date = new Date(date);
    const day = date && date.getDate() || -1;
    const dayWithZero = day.toString().length > 1 ? day : '0' + day;
    const month = date && date.getMonth() + 1 || -1;
    const monthWithZero = month.toString().length > 1 ? month : '0' + month;
    const year = date && date.getFullYear() || -1;

    return `${monthWithZero}/${dayWithZero}/${year}`;
  }
  
  exportPDF(){
    this.cs.displayLoader(true);    
    var fileName = this.inputData.advisorTeamName +"-"+this.dateFormat(this.inputData.createDate)+'.pdf'
    var data = document.getElementById('export'); 
      var data = document.getElementById('export');  
      
       html2canvas(data, {scrollY: -window.scrollY, 
   scale: 1}).then(canvas => {    
         
        var imgWidth = 208;     
        var pageHeight = 295;      
        var imgHeight = canvas.height * imgWidth / canvas.width;    
        var heightLeft = imgHeight;    

        console.log(imgHeight)
      
        const contentDataURL = canvas.toDataURL('image/png')    
        let pdf = new jsPDF('p', 'mm', 'a4'); // A4 size page of PDF    
        var position = 0;    
        pdf.addImage(contentDataURL, 'PNG', 0, position, imgWidth, imgHeight)    
    
        pdf.save(fileName); // Generated PDF     
            });     
       
       this.cs.clearLoader();
  }

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

}
