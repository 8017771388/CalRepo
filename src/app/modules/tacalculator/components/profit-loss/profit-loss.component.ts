import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { TAcalculatorService } from '../../services/tacalculator.service';
import { DxDataGridComponent, DxButtonModule } from "devextreme-angular";
import { CurrencyPipe, DecimalPipe, Location } from '@angular/common';
import 'devextreme/integration/jquery';  
import { CommunicationService } from "../../../_shared/services/communication.services";
import { BsModalService, BsModalRef } from "ngx-bootstrap/modal";
import { NpvModalComponent } from '../../../_shared/components/npv-modal/npv-modal.component';
import { Router, ActivatedRoute, Resolve } from "@angular/router";

@Component({
  selector: 'app-profit-loss',
  templateUrl: './profit-loss.component.html',
  styleUrls: ['./profit-loss.component.scss']
})
export class ProfitLossComponent implements OnInit {

  @Input() offerData;
  @Input() modelId;
  public plData : any = [];
  public plFilteredData : any = [];
  public plHeader : any = [];
    public plReport: any = [];
    public ocData : any = [];
  public ocHeader : any = [];
  public bsModalRef: BsModalRef;
  public isPopupVisible : boolean = false;
  public openFrom = 'tab';
  public tableDataType = [];
  public browserTab : any = [];
  public modelID:any;
  public termID:any;

  @ViewChild("gridContainer")
    gridContainer: DxDataGridComponent;

    constructor(public taCS: TAcalculatorService, private currencyPipe: CurrencyPipe,
        private decimalPipe: DecimalPipe, private communicationService: CommunicationService, private modalService: BsModalService, private router: Router, private location: Location,
        private acRoute: ActivatedRoute) { 
            this.communicationService.getOfferCalculateButton().subscribe(res => {
              if(res.calculateOfferButton == true){
                this.closeNpvTab();
              }
            })

            this.communicationService.getOfferClearButton().subscribe(res => {
              if(res == true){
                this.closeNpvTab();
              }
            })
            
        }

  ngOnChanges(){
    this.modelID = this.modelId.modelId;
    this.termID = this.modelId.termId;
    this.filterPLData();
  }

  ngOnInit(): void {
    this.communicationService.displayLoader(true);
    this.modelID = this.modelId.modelId;
    this.termID = this.modelId.termId;  
     
      this.communicationService.getDataType().subscribe(data => {
        this.tableDataType = data;
        
      })
    
    
      this.communicationService.getPandLReport().subscribe(res => {
      if(res!==null){
        let plRes = JSON.parse(JSON.stringify(res));
        this.plHeader = plRes.filter(el => el.rowLevel == 0)
        this.plFilteredData = plRes.filter(el => el.rowLevel != 0);
        this.filterPLData();
        
      }
       

    });
    

    this.communicationService.getOfferCriteria().subscribe(oc=> {
      this.communicationService.displayLoader(true);
      if(oc != null){
        
        let ocRes = JSON.parse(JSON.stringify(oc));
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
      this.communicationService.displayLoader(false);
      }
      else{
        this.communicationService.displayLoader(false);
      }
    }, err => {
      this.communicationService.displayLoader(false);
    })

  }

  filterPLData(){
    this.communicationService.displayLoader(true);
    this.plData = JSON.parse(JSON.stringify(this.plFilteredData.filter(el => el.modelId == this.modelID && el.termId == this.termID)));
        this.plData.forEach(element => {
            if (element.roaDataType?.toLowerCase() == 'bps') {
                element['roaActualValue'] = element.roaValue != null ? element.roaValue + 'bps' : element.roaValue;
              element.roaValue = element.roaValue != null ? element.roaValue.toFixed(1) + 'bps' : element.roaValue;
          }
            else if (element.roaDataType?.toLowerCase() == 'percent') {
                element['roaActualValue'] = element.roaValue != null ? element.roaValue*100 + '%' : element.roaValue;
              element.roaValue = element.roaValue != null ? (element.roaValue*100).toFixed(1) + '%' : element.roaValue;
          }
            else if (element.roaDataType?.toLowerCase() == 'months') {
                element['roaActualValue'] = element.roaValue != null ? element.roaValue + 'months' : element.roaValue;
            element.roaValue = element.roaValue != null ? element.roaValue + 'months' : element.roaValue;
          }
            else if (element.roaDataType?.toLowerCase() == 'dollars') {
                element['roaActualValue'] = element.roaValue != null ? this.currencyPipe.transform(element.roaValue, 'USD', '$', '1.0-8') : element.roaValue;
              element.roaValue = element.roaValue != null ? this.currencyPipe.transform(element.roaValue, 'USD', '$', '1.0-0') : element.roaValue;
            }
            

            if (element.year1DataType?.toLowerCase() == 'bps') {
                
                element.year1Value = element.year1Value != null ? element.year1Value.toFixed(1) + 'bps' : element.year1Value;
            }
            else if (element.year1DataType?.toLowerCase() == 'percent') {
                
                element.year1Value = element.year1Value != null ? (element.year1Value * 100).toFixed(1) + '%' : element.year1Value;
            }
            else if (element.year1DataType?.toLowerCase() == 'months') {
               
                element.year1Value = element.year1Value != null ? element.year1Value + 'months' : element.year1Value;
            }
            else if (element.year1DataType?.toLowerCase() == 'dollars') {
                
                element.year1Value = element.year1Value != null ? this.currencyPipe.transform(element.year1Value, 'USD', '$', '1.0-0') : element.year1Value;
            }
            else if (element.year1DataType?.toLowerCase() == '') {

                element.year1Value  = element.year1Value != null ? (element.year1Value).toFixed(1) : element.year1Value;
            }
        });

        this.plData =  this.plData.sort(function (x, y) {
          let a = x.sortOrder,
              b = y.sortOrder;
          return a == b ? 0 : a > b ? 1 : -1;
        });
        this.communicationService.displayLoader(false);
  }

  onCellPrepared(e){
    
    if (e.rowType == "data" && e.data.rowLevel == 2){  
       
       // e.cellElement[0].className += " rowLevel2";
        e.cellElement.addClass(" rowLevel2");
    }
    else if (e.rowType == "data" && e.data.rowLevel == 3){  
       
       // e.cellElement[0].className += " rowLevel3";
        e.cellElement.addClass(" rowLevel3");
    }
    else if (e.rowType == "data" && e.data.rowLevel == 4) {

        // e.cellElement[0].className += " rowLevel3";
        e.cellElement.addClass(" rowLevel4");
    }
      //if (e.rowType == "data" && e.data.rowLevel > 0 && e.column.dataField === "roaValue") {         
      //    e.cellElement.title= e.data.roaActualValue;
      //}
      //else if (e.rowType == "data" && e.data.rowLevel > 0 && e.column.dataField === "year1Value") {
      //    e.cellElement.title= e.data.year1ActualValue;
      //}
  }

  
  npvModal(){
    let initialState = {
        
        title: "Add a Table",
        offerData: this.offerData,
        openFrom : 'modal'
        
    };
    
    

    this.bsModalRef = this.modalService.show(NpvModalComponent, {
        initialState,
        backdrop: "static",
        class: "modalXl",
    });
    this.bsModalRef.content.closeBtnName = "Close";
    // this.bsModalRef.content.confirm.subscribe((value) => {
        
    // });
  }

  npvPopUp(){
    this.isPopupVisible = !this.isPopupVisible;
  }

  openNpvTab(id){

    var queryParam = {
      'modelID' : this.modelId.modelId,
      'termID' : this.modelId.termId,
      'name': this.modelId.name
    }
    
    var url = this.router.serializeUrl(
      this.router.createUrlTree([`/tacalculator/create-offer/npv/${id}`,{state:JSON.stringify(queryParam)}])
    );
      console.log('openNpvTab',url)
      this.browserTab.push(window.open(url, '_blank'))
      
   //window.open(url, '_blank');

  }
  openAssumptionTab(id){

    var queryParam = {
      'modelID' : this.modelId.modelId,
      'termID' : this.modelId.termId,
      'name': this.modelId.name
    }
    
    var url = this.router.serializeUrl(
      this.router.createUrlTree([`/tacalculator/create-offer/dynamicassumption/${id}`,{state:JSON.stringify(queryParam)}])
    );
      console.log('openAssumptionTab', url)
    this.browserTab.push(window.open(url, '_blank'))
    //window.open(url, '_blank');
  }

  closeNpvTab(){
    this.browserTab.forEach(element => {
      element.close();
    });
    this.browserTab = [];
  }

}
