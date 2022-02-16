import { Component, OnInit, ViewChild, ɵConsole } from '@angular/core';

import { AssumptionTable } from '../../../_shared/models/assumptiontables/assumption-table';
import { AssumptiontableService } from '../../services/assumptiontable/assumptiontable.service';

import { LoaderService } from '../../../_shared/services/loader.service';
import { ModelsService } from '../../services/Models/models.service';
import { Workflow } from '../../../_shared/models/workflow/workflow';
import { forkJoin, Observable } from 'rxjs';
import { WorkflowLookupTableRow } from '../../../_shared/models/workflow/workflowLookupTableRow';
import Swal from 'sweetalert2';
import { MatOption } from '@angular/material/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { LookupDataType } from '../../../_shared/models/assumptiontables/lookup-data-type';
import { LookupCategories } from '../../../_shared/models/assumptiontables/lookup-categories';

@Component({
  selector: 'app-table-relationships',
  templateUrl: './table-relationships.component.html',
  styleUrls: ['./table-relationships.component.css']
})
export class TableRelationshipsComponent implements OnInit {

  public tables : AssumptionTable[] = [];
  public models: Workflow[] =  [];
  public tableIds: Array<number> = [];
  public tablesDisplayed: Array<AssumptionTable> = [];
  public selectedModelsTemp: Array<Workflow> = [];
  public selectedModels: Array<Workflow> = [];
  public workflowLookupTableRows: WorkflowLookupTableRow[] = [];
  public highlightedRows: number[] = [];
  @ViewChild('allTablesSelected') private allTablesSelected: MatOption;
  @ViewChild('allModelsSelected') private allModelsSelected: MatOption;
  selectAllTablesForm: FormGroup;
  selectAllModelsForm: FormGroup;
  public toggleAllTablesActualCount = 0;
  public toggleAllTablesExpectedCount = 0;
  public toggleAllModelsActualCount = 0;
  public toggleAllModelsExpectedCount = 0;
  public deselectAllTables = false;
  public deselectAllModels = false;
  public categories: Array<LookupCategories> = [];
  public tableRelationShipForm: any;
  
  constructor(
    private assumptiontableService: AssumptiontableService,
    private modelsService: ModelsService,
    private loaderService: LoaderService,
    private fb: FormBuilder
  )
  {  }

  ngOnInit(): void {
    //this.loaderService.show("loading", "...");
    this.selectAllTablesForm = this.fb.group({
      selectAllTablesControl: new FormControl('')
    });  
    this.selectAllModelsForm = this.fb.group({
      selectAllModelsControl: new FormControl('')
    });    
    
    //forkJoin([
    //  this.assumptiontableService.getActiveTables(),
    //  this.modelsService.getModels(),
    //  this.assumptiontableService.GetLookupCategories()
    //]).subscribe((data:Array<any>) => {
    //  this.getTables(data[0].data);
    //  this.getModels(data[1].data);
    //  this.getCategories(data[2].data);
    //  this.loaderService.hide();
    //});
    
  }

  public getModels(data: Array<Workflow>) {
        this.models = data;
        this.loaderService.hide();
  }

  public getTables(data: Array<AssumptionTable>) {
    data.forEach(arr => {
          this.tables = this.tables.concat(arr);
    })
  }

  public getCategories(categories: Array<LookupCategories> ){
    this.categories = categories;
  }

  public TablesSelected(event): void{

    if(event.isUserInput) {
      console.log(event.source.value, "selected: " + event.source.selected);
    }

    if(event.source.selected) {
      this.tableIds.push(event.source.value);

      if(this.tableIds.length == this.tables.length){
        this.allTablesSelected.select();
      }
    }
    else{
      if(this.deselectAllTables == true){ // reset all data
        this.tableIds = []; 
        this.tablesDisplayed = [];
        this.deselectAllTables = false;
      }
      else{
        console.log("removing " + event.source.value + " from tableIds");
        console.log(this.allTablesSelected);
        this.allTablesSelected.deselect();

        if(this.toggleAllTablesExpectedCount > 0){ //If select all is set, uncheck it
          console.log('unselect select all');
        }

        else{
          this.tableIds.forEach((id, index) => {
          if(this.tableIds[index] == event.source.value)
            this.tableIds.splice(index, 1);
          });
        }

        if(this.tableIds.length == 0) this.tablesDisplayed = [];
      }
    }

    if(this.toggleAllTablesExpectedCount > 0){ //This only fires when select all, it prevents racing for every id in the list until the list is set.
      if(this.tableIds.length == this.toggleAllTablesExpectedCount){ 
        this.GetTableList(this.tableIds);
        console.log(this.tableIds);
      }
    }
    else{
      this.GetTableList(this.tableIds);
  }
    this.highlightedRows = [];
  }

  public GetTableList(ids: Array<number>){
    this.assumptiontableService.GetTableList(ids).subscribe(data => {
     this.tablesDisplayed = data.data;
    })
  }

  public ModelsSelected(event, model: Workflow): void{
    if(this.toggleAllModelsExpectedCount > 0){
      setTimeout(()=> {
        this.selectedModels = []; // To detect change in child component, the array needs to be reinitialised
        this.selectedModels =  [...this.models];
        this.selectedModelsTemp = [...this.models]; 
      }, 500);
    }
    else{
      if(event.isUserInput) {
        console.log(model.name, "selected: " + event.source.selected);
      }
  
      if(event.source.selected) {
        this.selectedModelsTemp.push(model);
        
        if(this.selectedModelsTemp.length == this.models.length){
          this.allModelsSelected.select();
        }
      }
      else{
        if(this.deselectAllModels == true){ // reset all data
          this.selectedModels = []; 
          this.selectedModelsTemp = [];
          this.deselectAllModels = false;
        }
        else{
          console.log("removing " + model.name + " from models");
          this.allModelsSelected.deselect();

          this.selectedModelsTemp.forEach((id, index) => {
            if(this.selectedModelsTemp[index].id == model.id)
              this.selectedModelsTemp.splice(index, 1);
          });
        }
      }
      this.selectedModels = []; // To detect change in child component, the array needs to be reinitialised
      this.selectedModels =  [...this.selectedModelsTemp];  
    }
  }

  public updateRelationshipList(obj: any){
    var data = new WorkflowLookupTableRow();
    this.highlightedRows = [];
    console.log("Caught emittion: ", obj);
    data = obj["relationship"];
    console.log(data);
    data.workflowId = obj["modelId"];
    this.workflowLookupTableRows = this.workflowLookupTableRows.filter(item => item.lookupTableRowId !== data.lookupTableRowId);
    this.workflowLookupTableRows.unshift(data);

    this.workflowLookupTableRows.forEach((item) => {
      this.highlightedRows.push(item.lookupTableRowId);
    });

    console.log(this.workflowLookupTableRows);
  }

  public Save(){
    if(this.highlightedRows.length > 0){
      Swal.fire({
        title: 'Submit Changes',
        text: 'The ' + this.highlightedRows.length + ' changes highlighted will be submitted. Would you like to continue?',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: "Yes"
      }).then(isConfirmed => {
        if(isConfirmed.isConfirmed){
          this.loaderService.show("Saving", "...");
          this.modelsService.UpsertWorkflowTableRows(this.workflowLookupTableRows).subscribe(data => {
            if(data.isSuccesful){
              this.loaderService.hide();
              this.highlightedRows = [];
              this.workflowLookupTableRows = [];
            }
            else{
              this.loaderService.Error(data.message);
            }
          });
        }
      });
    }
    else{
      Swal.fire({
        title: "No changes detected",
        text: "Please add or update an item in order to submit",
        icon: "error",
        showCancelButton: false
      })
    }
  }

  public toggleAllTablesSelection(){
    if (this.allTablesSelected.selected) {
      this.toggleAllTablesExpectedCount = 0;
      this.loaderService.show("loading", "...");
      var arr = ["0"].concat(this.tables.map(item => item.id.toString()));
      this.toggleAllTablesExpectedCount = arr.length-1;
      this.selectAllTablesForm.controls.selectAllTablesControl.patchValue(arr);
    } else {
      console.log("De-selecting");
      this.deselectAllTables = true;
      this.selectAllTablesForm.controls.selectAllTablesControl.patchValue([]);
    }
  }

  public tableLoaded(obj: any){
    this.toggleAllTablesActualCount++;
    if(this.toggleAllTablesExpectedCount == this.toggleAllTablesActualCount){
      this.loaderService.hide();
      this.toggleAllTablesExpectedCount = 0;
      this.toggleAllTablesActualCount = 0;
    }
  }

  public modelLoaded(obj: any){
    this.toggleAllModelsActualCount++;
    if(this.toggleAllModelsActualCount == (this.tablesDisplayed.length * this.models.length)) {
      this.loaderService.hide();
      this.toggleAllModelsActualCount = 0;
      this.toggleAllModelsExpectedCount = 0;
    }
  }

  public toggleAllModelsSelection(){
    if (this.allModelsSelected.selected) {
      this.loaderService.show("loading", "...");
      this.toggleAllModelsExpectedCount = 0;
      this.toggleAllModelsActualCount = 0;
      var arr = ["0"].concat(this.models.map(item => item.id.toString()));
      this.toggleAllModelsExpectedCount = arr.length-1;
      this.selectAllModelsForm.controls.selectAllModelsControl.patchValue(arr);
    } else {
      console.log("De-selecting");
      this.deselectAllModels = true;
      this.selectAllModelsForm.controls.selectAllModelsControl.patchValue([]);
    }
  }

}
