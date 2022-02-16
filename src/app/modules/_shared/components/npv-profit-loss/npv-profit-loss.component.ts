import { Component, OnInit, Input } from '@angular/core';
import { TAcalculatorService } from '../../../tacalculator/services/tacalculator.service';
import { DxDataGridComponent, DxButtonModule } from "devextreme-angular";
import { CurrencyPipe, DecimalPipe } from '@angular/common';
import 'devextreme/integration/jquery';  
import { CommunicationService } from "../../../_shared/services/communication.services";

@Component({
  selector: 'app-npv-profit-loss',
  templateUrl: './npv-profit-loss.component.html',
  styleUrls: ['./npv-profit-loss.component.scss']
})
export class NpvProfitLossComponent implements OnInit {

  @Input() offerData;
  public plData : any = [];
  public plHeader : any = [];

  constructor(public taCS: TAcalculatorService, private currencyPipe: CurrencyPipe,
    private decimalPipe: DecimalPipe, private communicationService: CommunicationService) { }

  ngOnInit(): void {
    this.communicationService.getPandLReport().subscribe(res => {
      if(res!==null){
        var plRes = res;
        this.plHeader = plRes.filter(el => el.rowLevel == 0)
        this.plData = plRes.filter(el => el.rowLevel != 0);
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
            element['year1ActualValue'] = element.year1Value != null ? this.currencyPipe.transform(element.year1Value, 'USD', '$', '1.0-8') : element.year1Value;
            element.year1Value = element.year1Value != null ? this.currencyPipe.transform(element.year1Value, 'USD', '$', '1.0-0') : element.year1Value;
         
        });

        this.plData =  this.plData.sort(function (x, y) {
          let a = x.sortOrder,
              b = y.sortOrder;
          return a == b ? 0 : a > b ? 1 : -1;
        });
      }
       // this.communicationService.setPandLReport(this.plData);

    });
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
     
  }

}
