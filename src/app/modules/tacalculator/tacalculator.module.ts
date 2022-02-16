import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TACalculatorRountingModule } from './tacalculator.routing.module';
import { TAcalculatorPageComponent } from './components/tacalculator-page/tacalculator-page.component';
import { TAcalculatorInputFormComponent } from './components/tacalculator-input-form/tacalculator-input-form.component';
import { TAcalculatorService } from './services/tacalculator.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CurrencyPipe, DecimalPipe } from '@angular/common';
import { SharedModule } from '../_shared/shared.module';
import { TacalculatorMessageComponent } from './components/tacalculator-message/tacalculator-message.component';
import { rangeValidatorDirective } from '../_shared/directives/rangeValidator';
import { compareValidatorDirective } from '../_shared/directives/compareValidator';
import { OnlynumberDirective } from '../_shared/directives/onlyNumber';
import { DxTagBoxModule } from "devextreme-angular/ui/tag-box";
import { ProfitLossComponent } from  './components/profit-loss/profit-loss.component';
import { DxDataGridModule, DxSelectBoxModule, DxCheckBoxModule } from 'devextreme-angular';
import { ModalModule, BsModalRef} from 'ngx-bootstrap/modal';
import { DxPopupModule } from 'devextreme-angular';
import { OfferPageComponent } from './components/offer-page/offer-page.component';
import { DynamicAssumptionsTableComponent } from './components/dynamic-assumptions-table/dynamic-assumptions-table.component';

@NgModule({
    declarations: [TAcalculatorPageComponent,
        TAcalculatorInputFormComponent,
        TacalculatorMessageComponent,
        rangeValidatorDirective,
        compareValidatorDirective,
        OnlynumberDirective,
        ProfitLossComponent,
        OfferPageComponent,
        DynamicAssumptionsTableComponent
        
       ],
  imports: [
    CommonModule,
      TACalculatorRountingModule,
      FormsModule,
      ReactiveFormsModule,
      SharedModule,
      DxTagBoxModule,
      DxDataGridModule,
      DxSelectBoxModule,
      DxCheckBoxModule,
      ModalModule.forRoot(),
      DxPopupModule
      
    ],
    exports: [
        TAcalculatorPageComponent

    ],
    providers: [TAcalculatorService, CurrencyPipe,
        DecimalPipe, BsModalRef]
})
export class TAcalculatorModule { }
