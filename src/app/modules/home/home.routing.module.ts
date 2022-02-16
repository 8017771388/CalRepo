import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { HomePageComponent } from "./components/home-page/home-page.component";
import { DirtyCheckGuard } from "../_shared/guards/dirty-check.guard";


//import { AuthGuardService } from '../_shared/guards/auth.guard';

const routes: Routes = [
    // {
    //     path: '', pathMatch: 'full', redirectTo: 'home-page'
    // },
    
    {
        path: "",
        component: HomePageComponent,
    }    
    //{
    //    path: "view-deals",
    //    component: ViewDealsComponent,
    //},
    //{
    //    path: "build-deal/:dealID/:dealTypeID",
    //    component: BuildDealComponent,
    //    canDeactivate: [DirtyCheckGuard]
    //},
    //{
    //    path: "view-deals-new/:dealID/:dealTypeID",
    //    component: ViewDealNewComponent,
    //},
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class HomeRoutingModule {}
