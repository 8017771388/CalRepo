import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { Workflow } from '../../../../../_shared/models/workflow/workflow';
import { LoaderService } from '../../../../../_shared/services/loader.service';
import { ModelsService } from '../../../../services/Models/models.service';

//import Swal from 'sweetalert2';

@Component({
  selector: 'app-addmodel',
  templateUrl: './addmodel.component.html',
  styleUrls: ['./addmodel.component.css']
})
export class AddmodelComponent implements OnInit {

  public addmodelForm : any = {};
  @ViewChild('modelForm') form: HTMLFormElement
  @Input() showAddModels : boolean;
  @Output() closeAddModels: EventEmitter<any> = new EventEmitter();
  @Output() workflowTableChanged :  EventEmitter<Workflow> = new EventEmitter();

  constructor(private modelsService : ModelsService, private loader : LoaderService) { }

  ngOnInit(): void {
    this.reset();
  }

  close() {
    this.closeAddModels.emit();
  }

  reset() {
    this.addmodelForm.name = "";
    this.addmodelForm.description = "";
    this.addmodelForm.startDate = new Date();
    this.addmodelForm.endDate = new Date();
    this.addmodelForm.isArchive = false;
  }

  save() {
    this.loader.show("Saving...", "Please wait");
    var req = new Workflow();
    req.id = 0;
    req.name = this.addmodelForm.name;
    req.description = this.addmodelForm.description;
    req.startDate = this.addmodelForm.startDate;
    req.endDate = this.addmodelForm.endDate;
    req.createDate = new Date();
    req.isActive = JSON.parse(this.addmodelForm.isArchive) == false;

    this.modelsService.Save(req).subscribe(
        response =>{
          this.loader.hide();
          this.workflowTableChanged.emit(response.data);
          this.close();
          if(response.isSuccesful) {
              this.loader.Success();
            }
            else {
              this.loader.Error(response.message);
            }
          }
      )
  }
}
