import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BrowserModule } from '@angular/platform-browser' 
import { HistoryPageComponent } from './component/history-page/history-page.component';
import { HistoryService } from './services/history.service';
import { HistoryRoutingModule } from './history.routing.module';
import { DxDataGridModule, DxSelectBoxModule, DxCheckBoxModule, DxListModule, DxDateBoxModule } from 'devextreme-angular';
import { ModalModule, BsModalRef, BsModalService} from 'ngx-bootstrap/modal';
import { CurrencyPipe, DecimalPipe } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';


@NgModule({
  declarations: [HistoryPageComponent],
    imports: [
        HistoryRoutingModule,       
        DxDataGridModule,
        DxSelectBoxModule,
        DxCheckBoxModule,
        DxDateBoxModule,
        ModalModule.forRoot(),
        BsDropdownModule.forRoot(),
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        DxListModule

    ],
    exports: [
        
        HistoryPageComponent
    ],

    providers: [HistoryService, BsModalRef, BsModalService, CurrencyPipe, DecimalPipe]

})
export class HistoryModule { }
