import { Component, EventEmitter, Input, OnInit, Output, ViewChild, OnChanges } from '@angular/core';
import { AssumptionTablePostUpdateRequest } from '../../../../_shared/models/assumptiontables/assumptionTableRequest'

import { AssumptionTable } from '../../../../_shared/models/assumptiontables/assumption-table';
import { AssumptionTableRows } from '../../../../_shared/models/assumptiontables/assumption-table-rows';
import { LookupCategories } from '../../../../_shared/models/assumptiontables/lookup-categories';
import { LookupDataType } from '../../../../_shared/models/assumptiontables/lookup-data-type';
import { User } from '../../../../_shared/models/user';
import { AssumptiontableService } from '../../../services/assumptiontable/assumptiontable.service'


import { LoaderService } from '../../../../_shared/services/loader.service';
//import { UserService } from 'src/app/services/user.service';
//import Swal from 'sweetalert2';

@Component({
  selector: 'app-addtable',
  templateUrl: './addtable.component.html',
  styleUrls: ['./addtable.component.css']
})

export class AddTableComponent implements OnInit {
  public tableForm : any = {};
  @ViewChild('ShowAddTableRow') form: HTMLFormElement;
  @Input() user: User;
  @Input() showAddTable : boolean;
  @Output() closeaAddTable: EventEmitter<any> = new EventEmitter();
  @Output() assumptionTableChanged:  EventEmitter<any> = new EventEmitter();
  @Input() tableTypes : LookupDataType[] = [];
  @Input() dataToEdit: AssumptionTable;
  @Input() isEditMode: boolean;
  isrequiredValues : any
  lookupTableCategories : LookupCategories[] = [];

  constructor(
    private assumptiontableService : AssumptiontableService,
    private loader : LoaderService) { }

  ngOnInit(): void {
    this.isrequiredValues = this.assumptiontableService.getisrequiredValues();
    this.getTableCategories();
  }

  public getTableCategories() {
    this.assumptiontableService.GetLookupCategories().subscribe(response => {
      if(response.isSuccesful) {
        this.lookupTableCategories = response.data;
      }
    });
  }

  ngOnChanges() {
    if(this.isEditMode) {
        this.getTableCategories();
        console.log(this.tableTypes, this.dataToEdit);
        this.tableForm.name = this.dataToEdit.name;
        this.tableForm.tableType = this.dataToEdit.lookupDataTypeId;
        this.tableForm.isrequired = this.dataToEdit.isActive;
        this.tableForm.id = this.dataToEdit.id;
        this.tableForm.tableCategory = this.dataToEdit.lookupCategoryId;
    }
  }

  save() {
    var req = new AssumptionTablePostUpdateRequest();
    req.id = parseInt(this.tableForm.id);
    req.name = this.tableForm.name;
    req.lookupDataTypeId = parseInt(this.tableForm.tableType);
    req.lookupCategoryId = parseInt(this.tableForm.tableCategory);
    req.isActive = JSON.parse(this.tableForm.isrequired);

    this.loader.show("Saving...", "Please wait");

    if(this.isEditMode) {
      this.assumptiontableService.Update(req).subscribe(
        response =>{
          this.assumptionTableChanged.emit();
          this.close();
          this.loader.hide();
          if(response.isSuccesful) {
             this.loader.Success();
            }
            else {
              this.loader.Error(response.message);
            }
          }
      )
    }
    else {
      req.id = 0;
      this.assumptiontableService.Save(req).subscribe(
        response =>{
          this.assumptionTableChanged.emit();
          this.close();
          this.loader.hide();
          if(response.isSuccesful) {
              this.assumptionTableChanged.emit();
              this.loader.Success();
            }
            else {
              this.loader.Error(response.message);
            }
          }
      )
    }
  }

  close() {
    this.closeaAddTable.emit();
  }

}
