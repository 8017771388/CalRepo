import { Component, EventEmitter, Input, OnInit, Output, ViewChild, OnChanges } from '@angular/core';
import { PackageGroups } from '../../../../_shared/models/packageGroups/package-groups';
import { LoaderService } from '../../../../_shared/services/loader.service';
import { PackageGroupService } from '../../../services/packagegroup/package-group.service';


@Component({
  selector: 'app-add-group',
  templateUrl: './add-group.component.html',
  styleUrls: ['./add-group.component.css']
})
export class AddGroupComponent implements OnInit {

  public addGroupForm : any = {};
  @ViewChild('modelForm') form: HTMLFormElement
  @Input() showAddGroup : boolean;
  @Output() closeAddGroup: EventEmitter<any> = new EventEmitter();
  @Output() emitSaveGroup: EventEmitter<any> = new EventEmitter();
  public isActiveValues : any;
  @Input() selectedItem : PackageGroups;

  constructor(private packageGroupService : PackageGroupService, private loader :  LoaderService) { }

  ngOnInit(): void {

  }

  ngOnChanges (): void {
    this.isActiveValues = this.packageGroupService.getActiveDropdownValues();
    if(this.selectedItem.Id > 0) {
      this.addGroupForm.id = this.selectedItem.Id;
      this.addGroupForm.name = this.selectedItem.Name;
      this.addGroupForm.description = this.selectedItem.Description;
      this.addGroupForm.isActive = this.selectedItem.IsActive;
    }
    else {
      this.reset();
    }
  }

  close() {
    this.closeAddGroup.emit();
  }

  reset() {
    this.addGroupForm.id = 0;
    this.addGroupForm.name = "";
    this.addGroupForm.description = "";
    this.addGroupForm.isActive = false;
  }

  save() {
    this.loader.show("Saving...", "Please wait");
    var req = new PackageGroups();
    req.Id = this.addGroupForm.id;
    req.Name = this.addGroupForm.name;
    req.Description = this.addGroupForm.description;
    req.ModifyById = 0;
    req.ModifyDate = new Date();
    req.IsActive = JSON.parse(this.addGroupForm.isActive);

    this.packageGroupService.Save(req).subscribe(
        response =>{
          this.loader.hide();
          this.close();
          if(response.isSuccesful) {
              this.loader.Success();
              this.reset();
              this.close();
              this.emitSaveGroup.emit();
            }
            else {
              this.loader.Error(response.message);
            }
          }
      )
  }

}
