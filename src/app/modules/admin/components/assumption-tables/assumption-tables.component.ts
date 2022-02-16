import { Component, EventEmitter, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { AssumptiontableService } from '../../services/assumptiontable/assumptiontable.service'
import { AssumptionTable } from '../../../_shared/models/assumptiontables/assumption-table';

import { LoaderService } from '../../../_shared/services/loader.service';
import { CommunicationService } from '../../../_shared/services/communication.services';
import { AssumptionTableRows } from '../../../_shared/models/assumptiontables/assumption-table-rows';

import { LookupDataType } from '../../../_shared/models/assumptiontables/lookup-data-type';
import { NgForm } from '@angular/forms';
import { AssumptionTableRowsService } from '../../services/assumptionTableRow/assumption-table-rows.service';
//  import { MatSort } from '@angular/material/sort';
// import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-assumption-tables',
  templateUrl: './assumption-tables.component.html',
  styleUrls: ['./assumption-tables.component.css']
})
export class AssumptionTablesComponent implements OnInit {
  @ViewChild('assumptionTableForm') form: HTMLFormElement;
  public assumptionTableForm: any = {};
  public tableTypes: LookupDataType[] = [];
  public tables: AssumptionTable[] = [];
  public tableRows: AssumptionTableRows[] = [];
  public isAddTableVisible : boolean = false;
  public isAddTableRowVisible : boolean = false;
  public editData: AssumptionTable;
  public showTable: boolean = false;
  public tableType: string;
  public isEditMode: boolean = false;
  public categories: string[];
  public currentTable: AssumptionTable;
  public displayedColumns: string[] = ['name', 'value', 'isActive'];
  // public dataSource: MatTableDataSource<AssumptionTableRows> = new MatTableDataSource([]);
  // @ViewChild(MatSort) sort: MatSort;

  constructor(
    private assumptiontableService: AssumptiontableService,
      private assumptiontableRowService: AssumptionTableRowsService,
      private communicationService: CommunicationService,
      private loader: LoaderService
  )
  { }

  ngOnInit(): void {
  this.loader.show("loading", "please wait");
   //this.getTables();
  }

//   bindTableData(tableData) { // Could be a generic function
//     this.dataSource.data = tableData;
//     this.dataSource.sort = this.sort;
//     this.dataSource.sortingDataAccessor = (item, property) => {
//       switch (property) {
//         case 'name': return item.name.toLowerCase();
//         case 'value': return parseFloat(item.value.toString());
//         default: return item[property];
//       }
//   }
// }

//   public getTables() {
//     console.log("getting tables");
//     this.assumptiontableService.getTables().subscribe(response => {
//       if(response) {
//         this.tables = [].concat(...response.data); // Merge the array into one
//         this.categories = Array.from(new Set(this.tables.map(({category}) => category))); // get unique categories
//         this.getTableRows(0);
//         this.getLookupDataType();
//       }
//     })
//   };


//   public getLookupDataType() {
//     this.assumptiontableService.getLookupDataType().subscribe(response => {
//       if(response.isSuccesful) {
//         this.tableTypes = response.data;
//       }
//     })
//   };

//   public getTableRows(id : Number) {
//     this.tables.forEach(table => {
//       if(table.id == id){
//         this.tableType = table.type;
//         this.currentTable = table;
//       }
//     });

//     this.showTable = (id == 0) ? false : true;
//     this.editData = this.tables.filter(table => table.id == id)[0];
//     if(id > 0){
//       this.assumptiontableRowService.getTableRows(id).subscribe(response => {
//         if(response.isSuccesful) {
//           this.tableRows = response.data;
//           //this.bindTableData(this.tableRows);
//           this.loader.hide();
//         }
//       });
//     }
//     else{
//         this.loader.hide();
//     }
//   }

//   public ShowAddTable(flag : boolean, editmode : boolean = false) {
//     this.isAddTableVisible = flag;
//     this.isEditMode = editmode;

//   }

//   public ShowAddTableRow (flag : boolean) {
//     this.isAddTableRowVisible = flag;
//   }

}
