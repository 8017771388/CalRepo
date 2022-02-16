import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';

import { PackageGroupAssignments } from '../../../../_shared/models/packageGroups/package-group-assignments';
import { PackageGroups } from '../../../../_shared/models/packageGroups/package-groups';
import { LoaderService } from '../../../../_shared/services/loader.service';
import { ModelsService } from '../../../services/Models/models.service';
import { PackageGroupService } from '../../../services/packagegroup/package-group.service';

@Component({
  selector: 'app-assignments',
  templateUrl: './assignments.component.html',
  styleUrls: ['./assignments.component.css']
})
export class AssignmentsComponent implements OnInit {

  public dataSource: MatTableDataSource<PackageGroups> = new MatTableDataSource([]);
  @ViewChild(MatSort) sort: MatSort;
  public packageGroupRows : PackageGroups[] = [];
  public packageGroupAssignmentRows : PackageGroupAssignments[] = [];
  public displayedColumns: string[] = ['modelName', 'sortOrder', 'isActive'];

  constructor(private packageGroupService : PackageGroupService, private modelservice : ModelsService, private loader: LoaderService) { }
  packageGroups : PackageGroups[];

  ngOnInit(): void {
    //this.loader.show("loading...","please wait");
    //this.packageGroupService.getWorkflowGroups().subscribe(response => {
    //  if(response.isSuccesful) {
    //    this.packageGroups = response.data;
    //    this.loader.hide();
    //  }
    //});
  }

  getTableRows(id : number) {
    this.getPackageGroupAssignmentRows(id);
  }

  public getPackageGroupAssignmentRows(id: number) {
    this.packageGroupService.getPackageGroupAssignmentRowsBypackageId(id).subscribe(response => {
      if(response.isSuccesful) {
        this.packageGroupAssignmentRows = response.data;
        this.bindTableData(this.packageGroupAssignmentRows);
        this.loader.hide();
      }
    });
  };

  bindTableData(tableData) {
    this.dataSource.data = tableData;
    this.dataSource.sort = this.sort;
    this.dataSource.sortingDataAccessor = (item, property) => {
      switch (property) {
        case 'name': return item.Name.toLowerCase();
        default: return item[property];
      }
  }
}

}
