import { Component, ElementRef, EventEmitter, Input, OnChanges, OnInit, Output, QueryList, SimpleChanges, ViewChild, ViewChildren } from '@angular/core';
import { MatCheckbox, MatCheckboxChange } from '@angular/material/checkbox';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { forkJoin, Observable } from 'rxjs';
import { AssumptionTable } from '../../../../../_shared/models/assumptiontables/assumption-table';
import { AssumptionTableRows } from '../../../../../_shared/models/assumptiontables/assumption-table-rows';
import { LookupDataType } from '../../../../../_shared/models/assumptiontables/lookup-data-type';
import { Workflow } from '../../../../../_shared/models/workflow/workflow';
import { WorkflowLookupTableRow } from '../../../../../_shared/models/workflow/workflowLookupTableRow';
import { AssumptiontableService as AssumptiontableService } from '../../../../services/assumptiontable/assumptiontable.service';
import { AssumptionTableRowsService } from '../../../../services/assumptionTableRow/assumption-table-rows.service';
import { ModelsService } from '../../../../services/Models/models.service';

@Component({
  selector: 'app-table-row',
  templateUrl: './table-row.component.html',
  styleUrls: ['./table-row.component.css']
})
export class TableRowComponent implements OnInit {
  public displayedColumns: string[] = [];
  public dataSource: MatTableDataSource<AssumptionTableRows> = new MatTableDataSource([]);;
  public TableRows: Array<AssumptionTableRows> = [];
  @ViewChild(MatSort) sort: MatSort;
  @Input() Table: AssumptionTable;
  @Input() Models: Array<Workflow>;
  public tableType: string;
  public tableRelationships: Array<WorkflowLookupTableRow> = [];
  @Output() emitter = new EventEmitter();
  @Output() tableLoaded = new EventEmitter();
  @Output() modelLoaded = new EventEmitter();
  @ViewChildren('checkboxes') private checkbox: QueryList<MatCheckbox>;
  @Input() highlightedRows: number[];

  constructor(
    private assumptiontableRowService: AssumptionTableRowsService,
    private assumptionTableService: AssumptiontableService,
    private modelService: ModelsService
  ) { }

  ngOnInit(): void {
    this.assumptiontableRowService.getTableRows(this.Table.id).subscribe(data => {
      this.TableRows = data.data;
      this.bindTableData(this.TableRows);
      
      forkJoin([
        this.assumptionTableService.getLookupDataType(),
        this.modelService.GetTableRelationShips(this.Table.id)
      ]).subscribe( (datas:Array<any>) => {
        this.getDataType(datas[0].data, this.Table.lookupDataTypeId);
        this.getRelationship(datas[1].data);
        this.tableLoaded.emit({ "tableName": this.Table.name, "tableId": this.Table.id })
      });
      
    })
  }

  ngOnChanges() {
    this.displayedColumns = ['name', 'value'];
    if (this.Models.length > 0){
      this.Models.forEach( item =>
        this.displayedColumns.push(item.name)
      )
      this.modelLoaded.emit({"isUpdated": true });    
    }
  }

  bindTableData(tableData : AssumptionTableRows[]) {
    this.dataSource.data = tableData;
    this.dataSource.sort = this.sort;
    this.dataSource.sortingDataAccessor = (item, property) => {
      switch (property) {
        case 'name': return item.name.toLowerCase();
        case 'value': return parseFloat(item.value.toString());
        default: return item[property];
      }
    }
  }

  private getDataType(data: Array<LookupDataType>, id: number){
    var types = data;
    types.forEach(type => {
      if(type.id == id) this.tableType = type.name
    });
  }

  private getRelationship(data: Array<WorkflowLookupTableRow>): void {
      this.tableRelationships = data;
  }

  isChecked(row: any, model: Workflow){
    var isChecked = false;
    var count = 0;

    this.tableRelationships.forEach(relationship => {
      if(relationship.lookupTableRowId == row.id) {

        if(relationship.workflowId == model.id){
          isChecked = true;
        }
      }
    })
    return isChecked;
  }

  onClick(row: AssumptionTableRows, model: Workflow, models: Array<Workflow>, event: MatCheckboxChange){
    var idListToDisable: Array<string> = [];
    var modelId = 0

    if(event.checked == true){

      models.forEach(mdl => {
        if(mdl.id != model.id){
          var id = "row" + row.id + "-model" + mdl.id;
          idListToDisable.push(id);
        }
      });

      idListToDisable.forEach(id => {
        this.checkbox.forEach(element => {
          if(element.id == id){
            element.checked = false;
          }
        });
      });

      modelId = model.id
    }

    var relationship = this.tableRelationships.map(function(e){ return e.lookupTableRowId}).indexOf(row.id);

    var relationshipObject = new WorkflowLookupTableRow();

    if(this.tableRelationships[relationship] == undefined){
      relationshipObject.lookupTableId = row.lookupTableId;
      relationshipObject.lookupTableRowId = row.id;
    } 
    else {
      relationshipObject = this.tableRelationships[relationship];
    }

    this.emitter.emit({ "relationship": relationshipObject, "modelId": modelId });
  }

}
