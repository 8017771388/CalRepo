import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { TAcalculatorService } from '../../services/tacalculator.service';
import { DxDataGridComponent, DxButtonModule } from "devextreme-angular";
import { CurrencyPipe, DecimalPipe } from '@angular/common';
import 'devextreme/integration/jquery';  
import { CommunicationService } from "../../../_shared/services/communication.services";
import { Router, ActivatedRoute, Resolve } from "@angular/router";


@Component({
  selector: 'app-npv-data',
  templateUrl: './npv-data.component.html',
  styleUrls: ['./npv-data.component.scss']
})
export class NpvDataComponent implements OnInit {
  @Input() offerData;
  public npvData : any = [];
  public npvHeader : any = [];
  public tableDataType : any =[];
  public id: any;
  public name: any;
  public ocData : any = [];
  public ocHeader : any = [];
  public routeParam : any;

  @ViewChild("gridContainer")
  gridContainer: DxDataGridComponent;
  constructor(public taCaS: TAcalculatorService,private currencyPipe: CurrencyPipe, 
     private communicationService: CommunicationService, private router: Router,
     private acRoute: ActivatedRoute) { }

  ngOnInit(): void {

    this.communicationService.displayLoader(true);

    if(this.offerData != undefined){
      this.id = this.offerData.id
    }
    else{
      this.acRoute.params.subscribe((params) => {
        
        this.routeParam = JSON.parse(params['state'])
        this.id = params["id"]
        this.name = this.routeParam.name;
       
      })
    }
    

    this.communicationService.getDataType().subscribe(data => {
      this.tableDataType = data;
      
    })

    this.taCaS.getNPVData(this.id,this.routeParam).subscribe(npv=> {
      if(npv != null){
        console.log(npv);
        var npvRes = npv["data"];
       this.npvHeader = npvRes.filter(el => el.rowLevel == 0)
        this.npvData = npvRes.filter(el => el.rowLevel != 0);

        this.npvData.forEach(element => {
            if (element.npvDataType.toLowerCase() == 'bps') {
             
            element.year1Value = element.year1Value != null ? element.year1Value.toFixed(1) + 'bps' : element.year1Value;
            element.year2Value = element.year2Value != null ? element.year2Value.toFixed(1) + 'bps' : element.year2Value;
            element.year3Value = element.year3Value != null ? element.year3Value.toFixed(1) + 'bps' : element.year3Value;
            element.year4Value = element.year4Value != null ? element.year4Value.toFixed(1) + 'bps' : element.year4Value;
            element.year5Value = element.year5Value != null ? element.year5Value.toFixed(1) + 'bps' : element.year5Value;
            element.year6Value = element.year6Value != null ? element.year6Value.toFixed(1) + 'bps' : element.year6Value;
            element.year7Value = element.year7Value != null ? element.year7Value.toFixed(1) + 'bps' : element.year7Value;
            element.year8Value = element.year8Value != null ? element.year8Value.toFixed(1) + 'bps' : element.year8Value;
            element.year9Value = element.year9Value != null ? element.year9Value.toFixed(1) + 'bps' : element.year9Value;
            element.year10Value = element.year10Value != null ? element.year10Value.toFixed(1) + 'bps' : element.year10Value;
        }
            else if (element.npvDataType.toLowerCase() == 'percent') {
             
            element.year1Value = element.year1Value != null ? (element.year1Value*100).toFixed(1) + '%' : element.year1Value;
            element.year2Value = element.year2Value != null ? (element.year2Value*100).toFixed(1) + '%' : element.year2Value;
            element.year3Value = element.year3Value != null ? (element.year3Value*100).toFixed(1) + '%' : element.year3Value;
            element.year4Value = element.year4Value != null ? (element.year4Value*100).toFixed(1) + '%' : element.year4Value;
            element.year5Value = element.year5Value != null ? (element.year5Value*100).toFixed(1) + '%' : element.year5Value;
            element.year6Value = element.year6Value != null ? (element.year6Value*100).toFixed(1) + '%' : element.year6Value;
            element.year7Value = element.year7Value != null ? (element.year7Value*100).toFixed(1) + '%' : element.year7Value;
            element.year8Value = element.year8Value != null ? (element.year8Value*100).toFixed(1) + '%' : element.year8Value;
            element.year9Value = element.year9Value != null ? (element.year9Value*100).toFixed(1) + '%' : element.year9Value;
            element.year10Value = element.year10Value != null ? (element.year10Value*100).toFixed(1) + '%' : element.year10Value;
        }
            else if (element.npvDataType.toLowerCase() == 'months') {
              
            element.year1Value = element.year1Value != null ? element.year1Value + 'months' : element.year1Value;
            element.year2Value = element.year2Value != null ? element.year2Value + 'months' : element.year2Value;
            element.year3Value = element.year3Value != null ? element.year3Value + 'months' : element.year3Value;
            element.year4Value = element.year4Value != null ? element.year4Value + 'months' : element.year4Value;
            element.year5Value = element.year5Value != null ? element.year5Value + 'months' : element.year5Value;
            element.year6Value = element.year6Value != null ? element.year6Value + 'months' : element.year6Value;
            element.year7Value = element.year7Value != null ? element.year7Value + 'months' : element.year7Value;
            element.year8Value = element.year8Value != null ? element.year8Value + 'months' : element.year8Value;
            element.year9Value = element.year9Value != null ? element.year9Value + 'months' : element.year9Value;
            element.year10Value = element.year10Value != null ? element.year10Value + 'months' : element.year10Value;
        }
            else if (element.npvDataType.toLowerCase() == 'dollars') {
              
            element.year1Value = element.year1Value != null ? this.currencyPipe.transform(element.year1Value, 'USD', '$', '1.0-0') : element.year1Value;
            element.year2Value = element.year2Value != null ? this.currencyPipe.transform(element.year2Value, 'USD', '$', '1.0-0') : element.year2Value;
            element.year3Value = element.year3Value != null ? this.currencyPipe.transform(element.year3Value, 'USD', '$', '1.0-0') : element.year3Value;
            element.year4Value = element.year4Value != null ? this.currencyPipe.transform(element.year4Value, 'USD', '$', '1.0-0') : element.year4Value;
            element.year5Value = element.year5Value != null ? this.currencyPipe.transform(element.year5Value, 'USD', '$', '1.0-0') : element.year5Value;
            element.year6Value = element.year6Value != null ? this.currencyPipe.transform(element.year6Value, 'USD', '$', '1.0-0') : element.year6Value;
            element.year7Value = element.year7Value != null ? this.currencyPipe.transform(element.year7Value, 'USD', '$', '1.0-0') : element.year7Value;
            element.year8Value = element.year8Value != null ? this.currencyPipe.transform(element.year8Value, 'USD', '$', '1.0-0') : element.year8Value;
            element.year9Value = element.year9Value != null ? this.currencyPipe.transform(element.year9Value, 'USD', '$', '1.0-0') : element.year9Value;
            element.year10Value = element.year10Value != null ? this.currencyPipe.transform(element.year10Value, 'USD', '$', '1.0-0') : element.year10Value;
          }
          
       
      });
        
      }
      this.communicationService.displayLoader(false)
    }, err => {
      this.communicationService.displayLoader(false);
    })

    this.taCaS.getOfferCriteria(this.id, this.routeParam).subscribe(oc=> {
      if(oc != null){
        
        var ocRes = oc["data"];
        this.ocHeader = ocRes.filter(el => el.rowLevel == 0)
        this.ocData = ocRes.filter(el => el.rowLevel != 0);

        this.ocData.forEach(element => {
            if (element.roicDataType.toLowerCase() == 'bps') {
              
            element.roicValue = element.roicValue != null ? element.roicValue.toFixed(1) + 'bps' : element.roicValue;
          }
            else if (element.roicDataType.toLowerCase() == 'percent') {
              
              element.roicValue = element.roicValue != null ? (element.roicValue*100).toFixed(1) + '%' : element.roicValue;
          }
            else if (element.roicDataType.toLowerCase() == 'months') {
                
              element.roicValue = element.roicValue != null ? element.roicValue + 'months' : element.roicValue;
          }
            else if (element.roicDataType.toLowerCase() == 'dollars') {
            element.roicValue = element.roicValue != null ? this.currencyPipe.transform(element.roicValue, 'USD', '$', '1.0-0') : element.roicValue;
          }

            if (element.taAmortizationDataType.toLowerCase() == 'bps') {
              
            element.taAmortizationValue = element.taAmortizationValue != null ? element.taAmortizationValue.toFixed(1) + 'bps' : element.taAmortizationValue;
          }
            else if (element.taAmortizationDataType.toLowerCase() == 'percent') {
              
              element.taAmortizationValue = element.taAmortizationValue != null ? (element.taAmortizationValue*100).toFixed(1) + '%' : element.taAmortizationValue;
          }
            else if (element.taAmortizationDataType.toLowerCase() == 'months') {
                
              element.taAmortizationValue = element.taAmortizationValue != null ? element.taAmortizationValue + 'months' : element.taAmortizationValue;
          }
            else if (element.taAmortizationDataType.toLowerCase() == 'dollars') {
            element.taAmortizationValue = element.taAmortizationValue != null ? this.currencyPipe.transform(element.taAmortizationValue, 'USD', '$', '1.0-0') : element.taAmortizationValue;
          }   
          
            if (element.taOfferDataType.toLowerCase() == 'bps') {
              
            element.taOfferValue = element.taOfferValue != null ? element.taOfferValue.toFixed(1) + 'bps' : element.taOfferValue;
          }
            else if (element.taOfferDataType.toLowerCase() == 'percent') {
              
              element.taOfferValue = element.taOfferValue != null ? (element.taOfferValue*100).toFixed(1) + '%' : element.taOfferValue;
          }
            else if (element.taOfferDataType.toLowerCase() == 'months') {
                
              element.taOfferValue = element.taOfferValue != null ? element.taOfferValue + 'months' : element.taOfferValue;
          }
            else if (element.taOfferDataType.toLowerCase() == 'dollars') {
            element.taOfferValue = element.taOfferValue != null ? this.currencyPipe.transform(element.taOfferValue, 'USD', '$', '1.0-0') : element.taOfferValue;
          } 
       
      });

      }
    })
  }

}
