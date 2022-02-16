import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { HistoryPageComponent } from './component/history-page/history-page.component';


const routes: Routes = [

    {
        path: '',
        component: HistoryPageComponent
    }
    //{
    //    path: 'create-deal/:id',
    //    component: InitiateDealComponent,
    //    canDeactivate: [DirtyCheckGuard]
    //},
   
];
@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})


export class HistoryRoutingModule { }
