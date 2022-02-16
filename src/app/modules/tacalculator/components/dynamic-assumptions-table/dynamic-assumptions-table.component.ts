import { Component, OnInit, ViewChild, ChangeDetectorRef,Input} from '@angular/core';
import DataSource from "devextreme/data/data_source";
import ArrayStore from 'devextreme/data/array_store';
import { DxDataGridComponent, DxButtonModule } from "devextreme-angular";
import { COLUMNS } from '../../../_shared/constants/global.constant';
import { CommunicationService } from '../../../_shared/services/communication.services';
import { TAcalculatorService } from '../../services/tacalculator.service';
import { confirm } from 'devextreme/ui/dialog';
import 'devextreme/integration/jquery'; 
import { CurrencyPipe, DecimalPipe } from '@angular/common'; 
import { Router, ActivatedRoute, Resolve } from "@angular/router";


@Component({
  selector: 'app-dynamic-assumptions-table',
  templateUrl: './dynamic-assumptions-table.component.html',
  styleUrls: ['./dynamic-assumptions-table.component.scss']
})
export class DynamicAssumptionsTableComponent implements OnInit {

  @Input() offerData;
  public dynamicAssumptionData : any = [];
  public id : any;
  public name : any;
  public noteTermName : any;
  public tables : any;
  public tableDS : any = [] ;
  public routeParam : any;

  @ViewChild("gridContainer")
    gridContainer: DxDataGridComponent;

  constructor(public taCaS: TAcalculatorService,private currencyPipe: CurrencyPipe, 
    private cs: CommunicationService,private router: Router,
    private acRoute: ActivatedRoute) { }


  ngOnInit(): void {
    if(this.offerData != undefined){
      this.id = this.offerData.id
    }
    else{
      this.acRoute.params.subscribe((params) => {
        this.routeParam = JSON.parse(params["state"])
        this.id = params["id"]
        this.name = this.routeParam.name;
        //this.noteTermName = params["noteTermName"]
        console.log(this.routeParam.name)
      })
    }
    this.cs.displayLoader(true);
    this.taCaS.getdynaminAssumptionData(this.id).subscribe(data => {
      if(data != null){
        this.tables = data["data"];
        console.log("data--------",this.tables);
        this.tableDS["tables"] = [];
                this.tables.forEach((element,index) => {  
                    let result = [];
                    let columns = [];
                    let format = "";
                    let valueFomat= element.table.dataType.toLowerCase();
                    if(element.table.dataType.toLowerCase() == "dollars"){
                        format = "currency"
                    }
                    else if(element.table.dataType.toLowerCase() == "bps" || element.table.dataType.toLowerCase() == "months" || element.table.dataType.toLowerCase() == "percent"){
                        format =""
                    }
                    else {
                        format = element.table.dataType.toLowerCase();
                    }
                    // if(element.table.columns.length <= 0){
                    //     element.table.columns = this.defaultCol;
                    // }
                    let tableData = {
                        category  : element.table.category,
                        dataType: format,
                        id: element.table.id,
                        name: element.table.name,
                        column: element.table.columns,
                        validationFormat: element.table.dataType,
                        saveEnabled : false,
                        originalRows: [],
                        rows:[]
                    }
                    this.tableDS.tables.push(tableData) ;  
                    columns = element.table.columns; 
                    console.log(tableData);
                        if(element.rows.length > 0){
                            element.table.columns.forEach(col => {
                               // var j = 0
                                element.rows.map(row=> {
                                  
                                    if (row.dynamicAssumptionTableColumnId == col.id && row.termId==col.termId){
                                        row["desc"] = row.name;
                                        row["rowId"] = row.id;
                                        row[col.name]=row.value;
                                        row["column"] = col.name;
                                        row["value"]=row.value;

                                       // row["rowKey"] = j;
                                        // let mergedData = Object.assign(row,col);
                                        // result.push(mergedData)
                                    }
                                   
                                   // j = j + 1;
                                })
                              
                            });

        
                            this.tableDS.tables[index]["originalRows"] = element.rows;
                            //console.log(result)
                           
                            result = element.rows.reduce((acc, item) => {
                                                        
                                acc[item.name] = (acc[item.name] || []);
                                acc[item.name].push(item);
                                return acc;
                            }, {});
                            console.log("result", result);
                            var i = 0;
                            Object.entries(result).forEach(([key,value]) => {
                                let rowCol = {};
                                console.log('key', key);
                                rowCol["desc"] = key;
                               
                                value.forEach((element,index) => {
                                    //console.log('element',element);
                                    rowCol["rowId"] = element.rowId;
                                    columns.forEach(elCol => {
                                      
                                        if(elCol.name == element.column){
                                            if (valueFomat == 'bps' || valueFomat == 'months') {
                                                element[elCol.name] = element[elCol.name] !== null ? (valueFomat == 'bps' ? (element[elCol.name].toFixed(1) + valueFomat) : (element[elCol.name] < 2 ? (element[elCol.name] + 'month') : (element[elCol.name] + valueFomat))) : null;
                                            }
                                            else if (valueFomat == 'percent') {
                                                element[elCol.name] = element[elCol.name] !== null ? ((element[elCol.name]*100).toFixed(1) + '%') : null
                                            }
                                            else if (valueFomat.toLowerCase() == 'dollars') {
                                                element[elCol.name] = element[elCol.name] != null ? this.currencyPipe.transform(element[elCol.name], 'USD', '$', '1.0-0') : element[elCol.name];
                                              }
                                            rowCol[elCol.name] = (element[elCol.name] )
                                            
                                        }
                                    })
                                    
                                    
        
                                });
                                rowCol["rowKey"] = i;
                                console.log('rowCol', rowCol)
                                this.tableDS.tables[index]["rows"].push(rowCol);
                                this.tableDS.tables[index]["originalRows"].forEach(r => {
                                    if (r.desc == rowCol["desc"]) {
                                        r["rowKey"] = i;
                                    }
                                })
                                //this.tableDS.tables[index]["originalRows"].push(rowCol);
                                i = i + 1;
                            })

        
                            this.tableDS.tables[index]["rows"] =  this.tableDS.tables[index]["rows"].sort(function (x, y) {
                                let a = x.desc.toUpperCase(),
                                    b = y.desc.toUpperCase();
                                return a == b ? 0 : a > b ? 1 : -1;
                            });


                        }
                        else {
                          
                            let emptyRow = {};
                            emptyRow["desc"]=null
                            element.table.columns.forEach(col => {            
                                emptyRow[col.name]=null
                            });
                           // this.tableDS.tables[index]["rows"].push(emptyRow);
                            
                            // var items = this.gridContainer.instance.getDataSource().items();
                            // items = this.tableDS.tables[index]["rows"];
                            // this.gridContainer.instance.editRow(this.tableDS.tables[index]["rows"].length)
                        }
                        console.log('thissssssssss',this.tableDS);
                        
                   
                });
                this.cs.clearLoader();
      }
      else{
        this.cs.clearLoader();
      }
    }), (err => {
      this.cs.clearLoader();
      console.log("cannot load tables: ", err);
  })

  }

  cellPrepared(e){
   // console.log(e)
    if(e.rowType == 'data'){
        if(e.value != null && e.value.toString().split("")[0] == '-'){
            e.cellElement.css('color', 'red');
        }
    }
    
}

}

