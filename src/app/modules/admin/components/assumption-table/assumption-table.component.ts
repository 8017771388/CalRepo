import { Component, OnInit, ViewChild, ChangeDetectorRef } from '@angular/core';
import { AssumptiontableService } from '../../services/assumptiontable/assumptiontable.service'
//import { DxTagBoxComponent } from "devextreme-angular/ui/tag-box";
import DataSource from "devextreme/data/data_source";
import ArrayStore from 'devextreme/data/array_store';
import { DxDataGridComponent, DxButtonModule ,DxLoadIndicatorModule} from "devextreme-angular";
import { COLUMNS } from '../../../_shared/constants/global.constant';
import { CommunicationService } from '../../../_shared/services/communication.services';
import { AddTableComponent } from '../../../_shared/components/add-table/add-table.component';
import { AddAssumptionTableComponent } from '../../../_shared/components/add-assumption-table/add-assumption-table.component';
import { BsModalService, BsModalRef } from "ngx-bootstrap/modal";
import { UserInfo } from "../../../_shared/services/userInfo.service";
import { confirm } from 'devextreme/ui/dialog';
import 'devextreme/integration/jquery';  

@Component({
    selector: 'app-assumption-table',
    templateUrl: './assumption-table.component.html',
    styleUrls: ['./assumption-table.component.scss']
})
export class AssumptionTableComponent implements OnInit {
    public currentUser: any;
    public bsModalRef: BsModalRef;
    public categories: any;
    public tables: any;
    public selectedCategoryID: number;
    public selectedTable: [];
    public isEnabled: any;
    public tableDS : any = [] ;
    public dataSource : any = []
    events: Array<string> = [];
    public assumptionTables: any;
    dataSourceNR: any = {};
    store: any;
    public defaultCol = COLUMNS;
    public format:any;
   // public bpsPattern: any = /^-?([0]{1}\.{1}[0-9]+|[1-9]{1}[0-9]*\.{1}[0-9]+|[0-9]+|0)$/;
    public bpsPattern: any = /^-?(\d+)?([.]?\d{0,1})?$/;
    public dollerPattern: any = /^-?[0-9]\d*(\d+)?$/;
    public monthPattern: any = /^\d+$/;
    @ViewChild("gridContainer")
    gridContainer: DxDataGridComponent;
    constructor(private userinfo: UserInfo, private assumptionTableService: AssumptiontableService,
        public cs: CommunicationService, private cdr: ChangeDetectorRef, private modalService: BsModalService, ) { }

    ngAfterViewChecked() {
        this.cdr.detectChanges();
    }

    ngOnInit(): void {
        this.currentUser = this.userinfo.getUserName();
        console.log(" this.currentUser", this.currentUser);
        console.log(" UserRole", this.userinfo.getUserRoles());
        this.isEnabled = false;
        this.tableDS["tables"] = [];
        this.assumptionTableService.getAllCategories().subscribe(resp => {
            if (resp && resp["isSuccesful"]) {
                this.categories = resp["data"];
                this.selectedCategoryID = 1;
                this.getAllTablesByCategoryID(this.selectedCategoryID);
                console.log("categories", this.categories);
            }
        }
        ), (err => {
            console.log("cannot load categories: ", err);
        })
        // this.getAllTablesByCategoryID(1);
    }
    getAllTablesByCategoryID(categoryID) {
        this.assumptionTableService.getAllTablesByCategoryID(categoryID).subscribe(resp => {
            if (resp && resp["isSuccesful"]) {
                this.assumptionTables = resp["data"];               
                this.isEnabled = false;
                this.selectedTable = null;

            }
        }
        ), (err => {
            console.log("cannot load tables: ", err);
        })
    }
    
    getTables(ids){        
        this.cs.displayLoader(true);
        this.assumptionTableService.getTableList(ids).subscribe(resp => {
            if (resp && resp["isSuccesful"]) {
                this.tables = resp["data"];
                console.log("tables--==--==", this.tables);
                
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
                                  
                                    if(row.columnId == col.id){
                                        row["desc"] = row.name;
                                        row["rowId"] = row.id;
                                        row[col.name]=row.value;
                                        row["column"] = col.name;
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
                                                element[elCol.name] = element[elCol.name] !== null ? (element[elCol.name].toFixed(1) + '%') : null
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
                        console.log(this.tableDS);
                        
                   
                });
               
               this.cs.clearLoader(); 
            }
            else{
                this.cs.clearLoader();
            }
        }
        ), (err => {
            this.cs.clearLoader();
            console.log("cannot load tables: ", err);
        }) 
        
    }

    enableSave(eventName, event, table){
        //console.log(table)
        table.saveEnabled = true;
    }

    logEvent(eventName, event) {
        
        //console.log(eventName)
        //console.log(event)
      
           // this.events.push(eventName);
       
    }

    addingNewRow(eventName, event, table){
        console.log(event);
        console.log(table);
        event.data.ID = table.rows.length + 1;  
        const rowIndex = event.component.getRowIndexByKey(event.data.ID);
        
        event.component.editRow(rowIndex);    
        
        
    }
    rowSaved(eventName, e, table){
        table.saveEnabled = false;
        console.log("e",e);
        console.log("table",table);
        console.log("eventName", eventName);
        console.log("table.originalRows", table.originalRows);

        let newData = e.data;
        let refreshGrid = "false";
        let req=[];
        let name;
        let rowKey;
        
            
        Object.entries(newData).forEach(([k,values]) => {
            let param={};
            
            if (k == 'desc'){
                name = values;
                rowKey = newData.rowKey;
                console.log('name', name);
            }
           // else{
                table.originalRows.forEach(element => {
                    //console.log('elementOriginalRow', element);
                   // console.log('name', name);
                    if (element.column == k && element.rowKey == rowKey){
                        param["id"] = element.rowId;
                        param["name"] = name;
                        param["value"] = (values == "" || values == null || values == undefined) ? null : Number(values);
                        param["assumptionTableId"] = table.id;
                        param["assumptionTableColumnId"] = element.columnId;
                        param["userName"] = this.currentUser;
                        console.log(param)
                        req.push(param);
                    }
    
                }); 
           // }
                       
            
            
        });
            


        if (req.length <= 0) {
            let description = newData.desc;
            let rowId = newData.rowId;
            console.log("newData", newData);
            table.column.forEach(element => {
                Object.entries(newData).forEach(([key, value]) => {

                    if ((element.name != key) && (key == 'desc')) {

                        let param = {
                            "id": 0,
                            "name": description,
                            "value": null,
                            "assumptionTableId": table.id,
                            "assumptionTableColumnId": element.id,
                            "userName": this.currentUser
                        }

                        req.push(param)

                    }
                    else if (element.name == key) {
                        let param = {
                            "id": 0,
                            "name": description,
                            "value": value == "" ? null : Number(value),
                            "assumptionTableId": table.id,
                            "assumptionTableColumnId": element.id,
                            "userName": this.currentUser
                        }

                        if (value != '') {
                            
                            var objIndex = req.findIndex((obj => obj.assumptionTableColumnId == element.id));
                            req[objIndex].value = value !== null ?Number(value): null;

                            if (objIndex < 0)
                                req.push(param)
                        }
                       

                    }


                });
            });


        }


        console.log('req', req);
       
        let singleRow = 0;


        req.forEach((request, index) => {
            if (request.id != 0) {

                this.assumptionTableService.updateRow(request).subscribe(res => {
                    console.log(res)
                    refreshGrid = "true";

                })
            }
            else  {
                //singleRow = singleRow + 1;


            }

        })


        var addReq = req.length > (table.column.length) ? (req.filter(el => el.id == 0 && el.value != null)) : req;

        addReq.forEach(element => {
            if (element.id == 0) {
                this.assumptionTableService.saveRow(element).subscribe(res => {
                    console.log(res)
                    refreshGrid = "true";

                })}
           
        }); 

        setTimeout(() => {
            if(refreshGrid == "true"){
                this.getTables(this.selectedTable)
            }
           
         },1500);
        
    }

    rowDeleted(eventName , e, table){
        table.saveEnabled = false;
    }

    
    editCancelling(eventName , e, table){
        console.log(eventName)
        table.saveEnabled = false;
    }
    rowInserted(eventName, e){
        console.log(eventName)
        const rowIndex = e.component.getRowIndexByKey(e.data.ID);

            // e.component.editRow(rowIndex);
            // const firstCell = e.component.getCellElement(rowIndex, 0);
            // e.component.focus(firstCell);
    }
    //insertCancelled(eventName, e, table) {
    //    table.saveEnabled = false;
    //}
    

    
    addNewRow(grid,table){
        
        grid.instance.addRow();
        //table.saveEnabled = true;
             
        
    }

    initRow(eName, e, table){
        table.saveEnabled = true;
    }
  
    onMultiTagPreparing(args) {
        var selectedItemsLength = args.selectedItems.length,
            totalCount = 1;

        if (selectedItemsLength < totalCount) {
            args.cancel = true;
        } else {
            args.text =  selectedItemsLength + " tables selected";
        }
    }

    setValidation(e,grid) {
       
        if (e.parentType == "dataRow") {
            var editor = e.component;
            if (e.dataField === "desc") {
                e.editorOptions.placeholder = "Description";
                e.editorOptions.disabled = true;
                if (e.row.hasOwnProperty('isNewRow')) {
                    e.editorOptions.disabled = false;
                }
                
            }
            else {
                e.editorOptions.placeholder = e.dataField;
                if (!(e.row.hasOwnProperty('isNewRow'))) {
                    var grd = e.component;
                    grd.focus(grd.getCellElement(e.row.rowIndex, 1));
                    
                }
                
            }

        }
        if (e.parentType === "dataRow" && e.dataField === "desc") {
            e.editorOptions.maxLength = 100;
            
            e.editorOptions.onKeyPress = function (args: any) {
                var str = args.event.key;
                //if (!(/^[a-zA-Z0-9 ]*$/).test(str)) {
                //    args.event.preventDefault();
                //}
            }
            e.editorOptions.onFocusOut = (x) => {
                var editor = x.component;
                if (editor._changedValue!=undefined)
                  x.component.option("value", editor._changedValue.toString().trim());  

            }
        }

        if (e.parentType === "dataRow" && e.dataField != "desc") {
            var data = e.value;
            
            if (data!=undefined && data.toString().indexOf('bps')!=-1) {
                data = data.replace("bps", "");
                e.editorOptions.value = data;
                e.setValue(e.editorOptions.value);
            }
            if (data != undefined && data.toString().indexOf('months')!=-1) {
                data = data.replace("months", "");
                e.editorOptions.value = data;
                e.setValue(e.editorOptions.value);
            }
            if (data != undefined && data.toString().indexOf('month') != -1) {
                data = data.replace("month", "");
                e.editorOptions.value = data;
                e.setValue(e.editorOptions.value);
            }
            if (data != undefined && data.toString().indexOf('%')!=-1) {
                data = data.replace("%", "");
                e.editorOptions.value = data;
                e.setValue(e.editorOptions.value);
            }
          
            e.editorOptions.valueChangeEvent = "keyup";
            //var cellValue = '';
        /*------------------------------------------*/
            e.editorOptions.onKeyPress = function (args: any) {
                var str = args.event.key;
                if (!(/^-?(\d+)?([.]?\d{0,1})?$/).test(str)) {
                    args.event.preventDefault();
                }
                //console.log(cellValue);
                //if (cellValue != undefined && str === '.') { //Restrict more that one decimal point
                    
                //    args.event.preventDefault(); 
                //}
                ////if (cellValue != undefined && cellValue.toString().indexOf('-') != -1 && str === '-') { //Restrict more that one decimal point
                ////    args.event.preventDefault();
                ////}

            }
            //e.editorOptions.onValueChanged = function (args: any) {
            //    cellValue=args.value;
            //}
        /*---------------------------------------------------------------------------*/
            //var formatType = '';
            //e.editorOptions.onFocusIn = (x) => {
            //   cellValue =x.component.value ;
            //    //if (cellValue.includes('bps')) {
            //    //    formatType = 'bps';
            //    //    //cellValue = cellValue.replace('bps', "");
            //    ////}
            //    //////x.component.option("value", cellValue);
            //}
           //// e.editorOptions.onFocusOut = (x) => {
                //alert('hi');
               // console.log(e);
                //var editor = x.component;
               // cellValue = editor._changedValue;
               // x.component.option("value", cellValue);
                //var result = confirm("Are you sure?", "Confirm changes");
                //result.done(function (dialogResult) {
                //    alert(dialogResult ? "Confirmed" : "Canceled");
                //}); 

        }
    }
    setTextBold(e) {
        if (e.parentType == "dataRow") {
            var editor = e.component;
            if (e.dataField === "desc") {
                var inputElement = e.editorElement.find("input");
               inputElement.css('font-weight', 'bold'); 
                
            }
        }
    }
    checkEnable() {
       
        console.log(this.selectedTable.length);
        this.isEnabled = (this.selectedTable === null || this.selectedTable.length<=0) ? false : true
    }

    addTable(){
        let initialState = {
            
            title: "Add a Table",
            currentUser: this.currentUser
        };

        this.bsModalRef = this.modalService.show(AddAssumptionTableComponent, {
            initialState,
            backdrop: "static",
            class: "modalXl",
        });
        this.bsModalRef.content.closeBtnName = "Close";
        // this.bsModalRef.content.confirm.subscribe((value) => {
            
        // });
    }

    cellPrepared(e){
        //console.log(e)
        if(e.rowType == 'data'){
            if(e.value != null && e.value.toString().split("")[0] == '-'){
                e.cellElement.css('color', 'red');
            }
        }
        
    }
}
