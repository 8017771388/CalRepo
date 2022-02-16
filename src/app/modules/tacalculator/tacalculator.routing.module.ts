import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { TAcalculatorPageComponent } from './components/tacalculator-page/tacalculator-page.component';
import { NpvDataComponent } from './components/npv-data/npv-data.component';
import { DynamicAssumptionsTableComponent } from './components/dynamic-assumptions-table/dynamic-assumptions-table.component';

const routes: Routes = [
       
    {
        path: '',
        component: TAcalculatorPageComponent
    },
    //{
    //    path: 'create-deal/:id',
    //    component: InitiateDealComponent,
    //    canDeactivate: [DirtyCheckGuard]
    //},
    {
       path: 'npv/:id',
       component: NpvDataComponent,
      
    },
    {
        path: 'dynamicassumption/:id',
        component: DynamicAssumptionsTableComponent,
       
     }
];
@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class TACalculatorRountingModule { }
