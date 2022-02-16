import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminRoutingModule } from './admin.routing.module';
import { SharedModule } from '../_shared/shared.module';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';


import { HomeService } from './services/home.service';
//import { DxDataGridModule } from 'devextreme-angular';

import { AdminPageComponent } from './components/admin-page/admin-page.component';
import { AuditlogComponent } from './components/auditlog/auditlog.component';

import { TabsModule } from 'ngx-bootstrap/tabs';
import { TypeaheadModule } from 'ngx-bootstrap/typeahead';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AssumptionTableComponent } from './components/assumption-table/assumption-table.component';
// import { ModelsComponent } from './components/models/models.component';
// import { AddmodelComponent } from './components/models/addModel/addmodel/addmodel.component';
// import { AddTableComponent } from './components/assumption-tables/addtable/addtable.component';
// import { AddTableRowComponent } from './components/assumption-tables/addtablerow/addtablerow.component';
// import { PackageGroupsComponent } from './components/package-groups/package-groups.component';
// import { AddGroupComponent } from './components/package-groups/add-group/add-group.component';
// import { AssignmentsComponent } from './components/package-groups/assignments/assignments.component';
// import { MatTableModule } from '@angular/material/table';
// import { MatSortModule } from '@angular/material/sort';
//import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
// import { MatCheckboxModule } from '@angular/material/checkbox';
// import { MatSelectModule } from '@angular/material/select';
// import { MatInputModule } from '@angular/material/input';
// import { MatFormFieldModule } from '@angular/material/form-field';
import { DxDataGridModule, DxSelectBoxModule } from 'devextreme-angular';
import { DxTagBoxModule } from "devextreme-angular/ui/tag-box";


@NgModule({
    declarations: [
        AdminPageComponent,        
        AssumptionTableComponent,       
        
        AuditlogComponent
    ],
	imports: [
		CommonModule,
		AdminRoutingModule,
		SharedModule,		
		TabsModule.forRoot(),
		BsDatepickerModule.forRoot(),
		TypeaheadModule.forRoot(),
        FormsModule,
        DxDataGridModule,
        DxSelectBoxModule,
        ReactiveFormsModule,
        DxTagBoxModule
	],
	exports: [
        
       
	],
	providers: [HomeService]
})
export class AdminModule { }
