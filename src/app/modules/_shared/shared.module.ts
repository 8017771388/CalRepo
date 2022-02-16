import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { ModalModule} from 'ngx-bootstrap/modal';
//import { NgSelectModule } from '@ng-select/ng-select';
import { SafeHtmlPipe } from './pipes/pipe.safehtml';
import {BooleanConverterpipe} from './pipes/pipe.boolean.converter';
import { UpperCaseDirective } from './directives/uppercase';
import { PhoneNumberDirective } from './directives/phoneNumber';
import { ZipConverterDirective } from './directives/zipConverter';
import { FilterPipe } from './pipes/pipe.filter';
import { BooleanFilterPipe } from './pipes/pipe.boolean.filter';
import { HeaderComponent } from './components/header/header.component';
import { SideBarComponent } from './components/side-bar/side-bar.component'; 
//import { DxGridComponent } from './components/dxGrid/dxgrid.component';
import { DxDataGridModule, DxSelectBoxModule } from 'devextreme-angular';
import { AuthGuardService } from './guards/auth.guard';
import { RouterModule } from '@angular/router';
import { SignOutComponent } from './components/sign-out/sign-out.component';
import { DueDatePipe } from './pipes/due-date.pipe';
import { ShortNamePipe } from './pipes/short-name.pipe';
import { ConfirmModalComponent } from './components/confirm-modal/confirm-modal.component';
import { FooterComponent } from "./components/footer/footer.component";


import { DragDropModule } from '@angular/cdk/drag-drop';
import { TypeaheadModule } from 'ngx-bootstrap/typeahead';
import { OneDigitDecimaNumberDirective } from './directives/decimalValidator';

import { UiSwitchModule } from 'ngx-ui-switch';

import { DirtyCheckGuard } from './guards/dirty-check.guard';
import { AddTableComponent } from './components/add-table/add-table.component';
import { AddAssumptionTableComponent } from './components/add-assumption-table/add-assumption-table.component';
import { AlertModule } from 'ngx-bootstrap/alert';
import {NpvModalComponent} from './components/npv-modal/npv-modal.component';
import {NpvDataComponent} from '../tacalculator/components/npv-data/npv-data.component';
import { NpvProfitLossComponent } from './components/npv-profit-loss/npv-profit-loss.component';
import { OfferErrorModalComponent } from './components/offer-error-modal/offer-error-modal.component';
import { ExportOfferComponent } from './components/export-offer/export-offer.component';

import { HistoryOfferComponent } from './components/history-offer/history-offer.component';



@NgModule({
    imports: [
        CommonModule,
        HttpClientModule,
        FormsModule,
        ReactiveFormsModule,
        RouterModule,             
        BsDatepickerModule.forRoot(), 
        DragDropModule,
        ModalModule.forRoot(),
        TypeaheadModule.forRoot(), 
        UiSwitchModule.forRoot({
            size: 'small',
            color: '#3f681c',
            switchColor: '#ffffff',
            defaultBgColor: '#ecebeb',
            defaultBoColor : '#094f00',
            checkedLabel: 'Deselect',
            uncheckedLabel: 'Select'
          }), 
          AlertModule.forRoot(),
          DxDataGridModule,
          DxSelectBoxModule
    ],
    declarations: [
        SafeHtmlPipe,
        BooleanConverterpipe,
        UpperCaseDirective,
        PhoneNumberDirective,
        ZipConverterDirective,
        FilterPipe,
        BooleanFilterPipe,
        HeaderComponent,
        SideBarComponent,
        SignOutComponent,
        DueDatePipe,
        ShortNamePipe,
        ConfirmModalComponent,
        OneDigitDecimaNumberDirective,
        FooterComponent,
        AddTableComponent,
        AddAssumptionTableComponent,
        NpvModalComponent,
        NpvDataComponent,
        NpvProfitLossComponent,
        OfferErrorModalComponent,

        ExportOfferComponent,
        HistoryOfferComponent

        
    ],
    exports: [
        HttpClientModule,
        FormsModule,
        ReactiveFormsModule,
        UpperCaseDirective,
        PhoneNumberDirective,
        OneDigitDecimaNumberDirective,
        ZipConverterDirective,
        FilterPipe,
        BooleanFilterPipe,
        BooleanConverterpipe,
        DueDatePipe,
        ShortNamePipe,
        HeaderComponent,
        SideBarComponent,
        SignOutComponent,
        FooterComponent,
        NpvModalComponent,
        NpvDataComponent
    
    ],
    entryComponents: [
        ConfirmModalComponent, OfferErrorModalComponent      
        
    ],
    providers: [AuthGuardService, DirtyCheckGuard]
})

export class SharedModule { }
