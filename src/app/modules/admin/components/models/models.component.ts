import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { ModelsService } from '../../services/Models/models.service'
import { Workflow } from '../../../_shared/models/workflow/workflow';
import { LoaderService } from '../../../_shared/services/loader.service';
// import { MatSort } from '@angular/material/sort';
// import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-models',
  templateUrl: './models.component.html',
  styleUrls: ['./models.component.css']
})
export class ModelsComponent implements OnInit {

  public modelRows : Workflow[] = [];
  public isaddModelsvisible : boolean = false;
  public displayedColumns: string[] = ['name', 'description', 'isActive'];
  // public dataSource: MatTableDataSource<Workflow> = new MatTableDataSource([]);

  // @ViewChild(MatSort) sort: MatSort;

  constructor(private modelsService : ModelsService, private loader : LoaderService) { }

  ngOnInit(): void {
    //this.loader.show("loading...","please wait");
    //this.getModelRows();
  }

//   public getModelRows() {
//     this.modelsService.getModels().subscribe(response => {
//       if(response.isSuccesful) {
//         this.modelRows = response.data;
//         this.bindTableData(this.modelRows);
//         this.loader.hide();
//       }
//     });
//   };

//   bindTableData(tableData) {
//     this.dataSource.data = tableData;
//     this.dataSource.sort = this.sort;
//     this.dataSource.sortingDataAccessor = (item, property) => {
//       switch (property) {
//         case 'name': return item.name.toLowerCase();
//         case 'description': return item.description.toLowerCase();
//         case 'startDate': return new Date(item.startDate);
//         case 'EndDate': return new Date(item.endDate);
//         default: return item[property];
//       }
//   }
// }

//   public showAddModels(flag : boolean) {
//     this.isaddModelsvisible = flag;
//   }

//   public workflowTableChangedHandler(workflowItem : Workflow) {
//     this.modelRows.push(workflowItem);
//     this.bindTableData(this.modelRows);
//   }
}
