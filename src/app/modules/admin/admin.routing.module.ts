import { NgModule} from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DirtyCheckGuard } from '../_shared/guards/dirty-check.guard';
import { AdminPageComponent } from './components/admin-page/admin-page.component';
import { AssumptionTablesComponent } from './components/assumption-tables/assumption-tables.component';
import { AuthGuardService } from '../_shared/guards/auth.guard';
import { ADMIN } from '../_shared/constants/global.constant';



const routes: Routes = [
    //{
    //    path: '', pathMatch: 'full', redirectTo: 'admin'
    //},
    {
        path: '',
        component: AdminPageComponent,
        canActivate: [AuthGuardService],
        data: { role: [ADMIN] }
    }
   
    //{
    //    path : 'assumptiontables',
    //    component: AssumptionTablesComponent
    //    //canDeactivate : [DirtyCheckGuard]
    //}
    //{
    //    path : 'create-deal',
    //    component : InitiateDealComponent,
    //    canDeactivate : [DirtyCheckGuard]
    //}
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class AdminRoutingModule { }
