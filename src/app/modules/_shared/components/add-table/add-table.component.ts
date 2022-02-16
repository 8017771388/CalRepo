import { Component, OnInit, HostListener } from '@angular/core';
import { BsModalService, BsModalRef } from "ngx-bootstrap/modal";
import { AssumptiontableService } from '../../../admin/services/assumptiontable/assumptiontable.service';
import { ConfirmModalComponent } from '../confirm-modal/confirm-modal.component';
import { CommunicationService } from '../../services/communication.services';
import { addSyntheticLeadingComment } from 'typescript';

@Component({
  selector: 'app-add-table',
  templateUrl: './add-table.component.html',
  styleUrls: ['./add-table.component.scss']
})
export class AddTableComponent implements OnInit {

  @HostListener('window:beforeunload', ['$event'])
    unloadNotification($event: any) {
        if (this.hasUnsavedData()) {
            $event.returnValue =true;
        }
    }
    
  public title : any;
  public categories: any;
  public selectedCategoryID: number;
  public tableType : number ;
  public tableName: any = "";
  public addDisabled: boolean = true;
  public isSuccessSave: boolean = false;
  public message : any = "";
  public messageType : any = "";
  public addedTable:any;
  public currentUser : any;
  public table : any ;
  public newRowTable : any = [];
  public description: any="";
  
  public placeholder : any;
  public min : any;
  public max : any;
  public newRowAdded : boolean = false;
  public initialRow : boolean = false;
  isDirty: boolean = false;
  public pattern : any;
  public bpsPattern: any = /^-?(\d+)?([.]?\d{0,1})?$/;
  public dollerPattern: any = /^-?[0-9]\d*(\d+)?$/;
  public dollarPattern : any = /^[-+]?(?:[0-9]+,)*[0-9]+(?:\.[0-9]+)?$/;
  public monthPattern: any = /^\d+$/;
  public columns:any=[];
  public types = [
    {
      "name" : "BPS",
      "id"  : 1
    },
    {
      "name" : "Dollars",
      "id"  : 2
    },
    {
      "name" : "Percent",
      "id"  : 3
    },
    {
      "name" : "Months",
      "id"  : 4
    },
  ]

  constructor(private assumptionTableService : AssumptiontableService, public modalService : BsModalService, public bsModalRef: BsModalRef, public bsModalRefCM: BsModalRef, public modalServiceCM : BsModalService, public cs : CommunicationService) { }

  ngOnInit(): void {

    this.assumptionTableService.getAllCategories().subscribe(resp => {
      if (resp && resp["isSuccesful"]) {
          this.categories = resp["data"];
          this.selectedCategoryID = 0;
          this.tableType = 0;
          console.log("categories", this.categories);
      }
    }
    ), (err => {
        console.log("cannot load categories: ", err);
    })
  }

  canDeactivate() {
    console.log(this.cs.getIsDirty());

    this.cs.getIsDirty().subscribe((dirty) => {
        this.isDirty = dirty;
    });
    
    return this.isDirty;
  }


  enableAdd(){
    
    this.cs.setIsDirty(true);
    
    if(this.tableName != '' && this.selectedCategoryID != 0 && this.tableType != 0){
      this.addDisabled = false
    }
    else{
      this.addDisabled = true;
    }
    
  }

  addTable(){
    this.cs.displayLoader(true);
    this.cs.setIsDirty(false);
    this.isDirty = true;
    var req = {
      "id": 0,
      "name": this.tableName,
      "assumptionTableCategoryId": Number(this.selectedCategoryID),
      "assumptionTableDataTypeId": Number(this.tableType),
      "isActive": true,
      "userName": this.currentUser
    }

    this.assumptionTableService.addTable(req).subscribe(res =>{
        this.message = res["message"];      
        this.addedTable = res["data"];
        this.messageType = res["isSuccesful"] == false ? 'danger' : 'success'
        this.addDisabled = true;
        this.isSuccessSave = res["isSuccesful"];

        if(this.addedTable != null){
          var id = [this.addedTable.id]
         
          if(this.addedTable.id != undefined){
            this.assumptionTableService.getTableList(id).subscribe((res) => {
              if(res["isSuccesful"] == true){
                this.table = JSON.parse(JSON.stringify(res["data"][0]));
                this.columns = JSON.parse(JSON.stringify(res["data"][0].table.columns))
                this.columns.forEach(element => {
                  element.value = ""
                });
                this.placeholder = this.table.table.dataType == "Dollars" ? '$' : (this.table.table.dataType == 'Percent' ? '%' : this.table.table.dataType.toLowerCase());
                this.table.table.columns.forEach(element => {
                  element["value"] = ""
                });

                if(this.table.table.dataType.toLowerCase() == "dollars"){
                  this.min="-10000000000";
                  this.max="10000000000";
                  this.pattern = this.dollarPattern
                }
                else if(this.table.table.dataType.toLowerCase() == "percent"){
                  this.min="-10";
                  this.max="10";
                  this.pattern = this.bpsPattern
                }
                else if(this.table.table.dataType.toLowerCase() == "months"){
                  this.min="0";
                  this.max="36";
                  this.pattern = this.monthPattern
                }
                else if(this.table.table.dataType.toLowerCase() == "bps"){
                  this.min="-10";
                  this.max="100";
                  this.pattern = this.bpsPattern;
                }
              
              }
              else{

              }
            
            }, (err)=>{
              console.log(err)
            })
          }
        }
        
        this.cs.clearLoader()
    })
  }
  
  onClosed(event): void {
    //console.log(event)
  }

    closeModal() {
        if ((this.tableName != '' || this.selectedCategoryID != 0 || this.tableType != 0 ) && this.isSuccessSave === false || this.isDirty == true) {
      let initialState = {
        title: "Are you sure?",
        confirmTxt: "If you close this window your data will be lost.  Are you sure you want to close this window?",
        confirmBtnTxt: "OK",
        cancelBtnTxt: "CANCEL",
      };
  
      this.bsModalRefCM = this.modalServiceCM.show(ConfirmModalComponent, {
        initialState,
        backdrop: "static",
        class: "modal-md modal-overley-top",
      });
      this.bsModalRefCM.content.closeBtnName = "Close";
      this.bsModalRefCM.content.confirm.subscribe((value) => {
        if(value == "true"){
          this.bsModalRefCM.hide();
          this.bsModalRef.hide();
        }
        else{
          this.bsModalRefCM.hide();
        }
      })
    }
    else{
      this.bsModalRef.hide();
    }
  }

  hasUnsavedData() {
    if(this.tableName != '' || this.selectedCategoryID != 0 || this.tableType != 0 || this.isDirty == true){
      return true
    }
    else{
      return false;
    }
  }
  deleteRow(row, event){
    this.table.newRows = this.table.newRows.filter(el=> el.desc != row.desc);
  }

  saveRow(rowData, form, addType, event){
    let rowSaved = "false";
    this.cs.displayLoader(true);

      if(addType == 'addRow'){
        if((rowData.hasError == 'false' || rowData.hasError == undefined) && this.description != ""){
          this.isDirty = false;
          this.initialRow = true;
          rowData.forEach(element => {
            let param = {
              "id": 0,
              "name": this.description,
              "value": element.value == "" ? null : Number(element.value.replace(/,/g, "")),
              "assumptionTableId": this.table.table.id,
              "assumptionTableColumnId": element.id,
              "userName": this.currentUser
            }
            this.assumptionTableService.saveRow(param).subscribe((res) => {
              if(res["isSuccesful"] == true){
                rowSaved = "true";
              }        
    
            }, (err) => {
              this.cs.clearLoader();
            })
          });
        }
      }
      else if(addType == 'addNewRow'){
        if((rowData.hasError == 'false' || rowData.hasError == undefined) && rowData.desc != ""){
          this.isDirty = false;
          let newrowName = rowData.desc;
          let addNewRowName = rowData.desc;
          
            if(this.newRowTable.length > 0){
              this.newRowTable = this.newRowTable.filter(nr => nr.desc != addNewRowName);
            }
            else{
              this.newRowTable = [];
              this.newRowAdded = false;
            }
        
          rowData.columns.forEach(element => {
            let param = {
              "id": 0,
              "name": newrowName,
              "value": element.value == "" ? null : Number(element.value.replace(/,/g, "")),
              "assumptionTableId": this.table.table.id,
              "assumptionTableColumnId": element.id,
              "userName": this.currentUser
            }
            this.assumptionTableService.saveRow(param).subscribe((res) => {
              if(res["isSuccesful"] == true){
                
                rowSaved = "true";
              }        
    
            }, (err) => {
              this.cs.clearLoader();
            })
          });
        }
      }
      else{
        if((rowData.hasError == 'false' || rowData.hasError == undefined) && rowData.desc != ""){
          this.isDirty = false;
          let name = rowData.editDesc;
          
          rowData.columns.forEach(element => {
            let value;
            if(this.table.table.dataType.toLowerCase() == 'dollars'){
              value = element.editValue == "" ? null : Number(element.editValue.replace(/,/g, ""))
            }
            else{
              value = element.editValue == "" ? null : Number(element.editValue)
            }
            let param = {
              "id": element.id,
              "name": name,
              "value": value,
              "assumptionTableId": this.table.table.id,
              "assumptionTableColumnId": element.columnId,
              "userName": this.currentUser
            }
            this.assumptionTableService.updateRow(param).subscribe((res) => {
              console.log(res)
              rowSaved = "true";

            }, (err) => {
              this.cs.clearLoader()
            })
          });
        }
      }  
      

      setTimeout(() => {
        if(rowSaved == "true"){
          this.cs.clearLoader();
          let id = [this.addedTable.id]
          this.getAddedRow(id);
        }
       
     },600);

      

    //}
  }

  getAddedRow(id){
    this.cs.displayLoader(true);
    let rowCol = []
    this.assumptionTableService.getTableList(id).subscribe((res)=> {
      if(res["isSuccesful"] == true){
        let addedRowtable = JSON.parse(JSON.stringify(res["data"][0]));
        addedRowtable.rows.forEach(element => {
          element.value = this.table.table.dataType.toLowerCase() == 'dollars' ? Number(element.value).toLocaleString() : element.value;
          element["editValue"] = element.value;

        });
        let result = addedRowtable.rows.reduce((acc, item) => {
                                                        
          acc[item.name] = (acc[item.name] || []);
          acc[item.name].push(item);
          return acc;
      }, {});
      this.table["rows"] = addedRowtable.rows;

      Object.entries(result).forEach(([key,value]) => { 
        let row = {};
        row["isEdit"] = "false";
        row["desc"] = key;
        row["editDesc"] = key
        row["columns"] = value;
        row["columns"] =  row["columns"].sort(function (x, y) {
        
          let a = x.columnId,
              b = y.columnId;
          return a == b ? 0 : a > b ? 1 : -1;
        });
        
        rowCol.push(row);
      });
       this.table["newRows"] = rowCol;
       console.log(this.table)
       this.cs.clearLoader();
      }
    }, (err)=>{
      console.log(err);
      this.cs.clearLoader();
    })
  }

  cancelRow(rowdata, cancelType, index){
    if(cancelType == 'addRow'){
      this.description = "";
      rowdata.forEach(element => {
        element["value"] = ""
      });
      this.initialRow = true;
    }
    else if(cancelType == 'addNewRow'){
      // rowdata.desc = "";
      // rowdata.columns.forEach(element => {
      //   element.value ="";
      // });
      this.newRowTable = this.newRowTable.filter((nr,rowIndex) => rowIndex!=index);
    }
    else{
      rowdata.isEdit = 'false';
      rowdata.editDesc = rowdata.desc;
      rowdata.hasError = false;
      rowdata.columns.forEach(rd => {
        rd.editValue = rd.value;
        rd.errorMessage="";
        
      });
    }
    
  }

  // checkValue(event){
  //   console.log(event)
  //   var rawValue = event.target.value;
  //   rawValue = rawValue.replace(/,/g, "");
  //   console.log(rawValue)
    
  //   if (Number(rawValue) > Number(this.max) || Number(rawValue) < Number(this.min)) {
  //     console.log("inside")
  //       if (event.keyCode === 8) {
  //           return true;
  //       } else {
  //           return false;
  //       }
  //   } else {
  //     console.log("outside")
  //       if(this.table.table.dataType.toLowerCase() == "dollars" && event.code == "Minus"){
  //         return event.key;
  //       }
  //       return true;
  //   }
  // }

  addNewRow(){
    this.isDirty = true;
    this.newRowAdded = true;
    let newRow = {};
    
    newRow["desc"] =""
    newRow["columns"] = JSON.parse(JSON.stringify(this.columns))
    // newRow["columns"].forEach(element => {
    //   element.value = ""
    // });
    console.log(newRow)
    this.newRowTable.push(newRow);
    console.log(this.newRowTable)
  }

  showErrorMessage(event, column, addType, row){
    this.isDirty = true;
    //if(addType == 'addRow'){
      if(this.table.table.dataType.toLowerCase() == "bps" ){
        if (!(this.bpsPattern.test(event))){
          column.errorMessage = "Please Enter One Decimal Place";
        }
        else if(Number(event) > 1000 || Number(event) < -100){
            column.errorMessage = "Please enter a value between -100 and 1000.";
        }
        else{
          column.errorMessage ="";
        }
      }
      else if(this.table.table.dataType.toLowerCase() == "percent"){
        if (!(this.bpsPattern.test(event))){
          column.errorMessage = "Please Enter One Decimal Place";
        }
        else if(Number(event) > 100 || Number(event) < -100){
            column.errorMessage = "Please enter a value between -100% and 100%.";
        }
        else{
          column.errorMessage ="";
        }
      }
      else if(this.table.table.dataType.toLowerCase() == "dollars"){

        if(addType != 'editRow'){
          column.value = column.value.replace(/,/g, "");
          event = event.replace(/,/g, "");
          if (column.value == "") {
            column.value = null;
            
          }
          else if(event == "-"){
            column.value = column.value;
          } else {
            column.value = Number(
              column.value
            ).toLocaleString();
          }
        }
        else if(addType == 'editRow'){
          column.editValue = column.editValue.replace(/,/g, "");
          event = event.replace(/,/g, "");
          if (column.editValue == "") {
            column.editValue = null;
            
          }
          else if(event == "-"){
            column.editValue = column.editValue;
          } else {
            column.editValue = Number(
              column.editValue
            ).toLocaleString();
          }
        }
        
        if (!(this.dollarPattern.test(Number(event)))){
          column.errorMessage = "Please Enter whole number only";
        }
        else if(Number(event) > 100000000000 || Number(event) < -100000000000){
            column.errorMessage = "Please enter a value between -$100,000,000,000 and $100,000,000,000.";
        }
        else{
          column.errorMessage ="";
        }
      }
      else if(this.table.table.dataType.toLowerCase() == "months"){
        if (!(this.monthPattern.test(Number(event)))){
          column.errorMessage = "Please Enter whole number only";
        }
        else if (Number(event) > 360 || Number(event) < 0){
          column.errorMessage = "Please enter the value between 0 and 360.";
        }
        else{
          column.errorMessage ="";
        }
      }

      if(addType == 'addRow'){
        let hasError = 'false';
        row.forEach(element => {
          if(element.errorMessage != '' && element.errorMessage != undefined){
            hasError = 'true';
          }
        });
        
        row['hasError'] = hasError
      }
      else{
        let hasError = 'false';
        row.columns.forEach(element => {
          if(element.errorMessage != '' && element.errorMessage != undefined){
            hasError = 'true';
          }
        });
        
        row['hasError'] = hasError
      }
      
    //}
    
  }
  focusIn(cell){
    cell['isFocus'] = "true";
  }
  focusOut(cell){
    cell['isFocus'] = "false";
  }

}
