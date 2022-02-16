import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { PackageGroups } from '../../../_shared/models/packageGroups/package-groups';
import { LoaderService } from '../../../_shared/services/loader.service';
import { PackageGroupService } from '../../services/packagegroup/package-group.service';

@Component({
  selector: 'app-package-groups',
  templateUrl: './package-groups.component.html',
  styleUrls: ['./package-groups.component.css']
})
export class PackageGroupsComponent implements OnInit {

  public packgeGroupRows : PackageGroups[] = [];
  public isAddGroupVisible : boolean = false;
  public displayedColumns: string[] = ['name', 'isActive'];
  public dataSource: MatTableDataSource<PackageGroups> = new MatTableDataSource([]);
  public selectedItem : PackageGroups;

  @ViewChild(MatSort) sort: MatSort;

  constructor(private packageGroupService : PackageGroupService, private loader : LoaderService) { }

  ngOnInit(): void {
    //this.loader.show("loading...","please wait");
    //this.getPackageGroupRows();
  }

  reloadTable() {
    this.getPackageGroupRows();
  }

  public getPackageGroupRows() {
    this.packageGroupService.getWorkflowGroups().subscribe(response => {
      if(response.isSuccesful) {
        this.packgeGroupRows = response.data;
        this.bindTableData(this.packgeGroupRows);
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


public showAddGroup(flag : boolean) {
  this.isAddGroupVisible = flag;
  if(flag == true) this.selectedItem = new PackageGroups();
}

populateForm(item) {
  this.selectedItem = new PackageGroups();
  this.selectedItem.Id =  item.id;
  this.selectedItem.Name = item.name;
  this.selectedItem.Description = item.description;
  this.selectedItem.IsActive = item.isActive;
  this.isAddGroupVisible = true;
}

}
