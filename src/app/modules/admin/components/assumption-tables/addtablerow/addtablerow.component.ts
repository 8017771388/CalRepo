import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { addTableRowRequest } from '../../../../_shared/models/assumptiontables/addTableRowRequest';
import { AssumptionTable } from '../../../../_shared/models/assumptiontables/assumption-table';
import { AssumptionTableRowsService } from '../../../services/assumptionTableRow/assumption-table-rows.service';
import { LoaderService } from '../../../../_shared/services/loader.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-addtablerow',
  templateUrl: './addtablerow.component.html',
  styleUrls: ['./addtablerow.component.css']
})
export class AddTableRowComponent implements OnInit {

  @Input() tableData: AssumptionTable;
  @Output() closeAddTableRow: EventEmitter<any> = new EventEmitter();
  @Output() dataChanged:  EventEmitter<any> = new EventEmitter();
  public newRowName: string;
  public newRowValue: string;

  constructor(
    private assumptiontableRowService : AssumptionTableRowsService,
    private loader : LoaderService
  ) { }


  ngOnInit(): void {
  }

  save() {
    var row = new addTableRowRequest();
    row.name = this.newRowName;
    row.value = this.newRowValue;
    row.lookupTableId = this.tableData.id;

    this.loader.show("Saving...", "Please wait");

    this.assumptiontableRowService.post(row).subscribe(response => {
      this.dataChanged.emit();
      this.closeAddTableRow.emit();
      if(response.isSuccesful){
        this.loader.hide();
        this.loader.Success();
      }
      else {
       this.loader.Error(response.message);
      }
    });
  }

  close() {
    this.closeAddTableRow.emit();
  }
}
