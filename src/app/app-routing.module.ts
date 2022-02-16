import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { AuthenticationService } from "./modules/_shared/services/authentication.service";
import { ErrorComponent } from "./modules/error/component/error.component";
import { SignOutComponent } from "./modules/_shared/components/sign-out/sign-out.component";

const routes: Routes = [
    { path: "", redirectTo: "/create-offer", pathMatch: "full" },
    {
        path: "create-offer",
        loadChildren: () =>
            import("./modules/tacalculator/tacalculator.module").then((m) => m.TAcalculatorModule),
        //loadChildren: () => import('./modules/home/home.module').then(m => m.HomeModule),
        resolve: { auth: AuthenticationService },
    },
    {
        path: "admin",
        loadChildren: () =>
            import("./modules/admin/admin.module").then((m) => m.AdminModule),
        //loadChildren: () => import('./modules/admin/admin.module').then(m => m.AdminModule),
        resolve: { auth: AuthenticationService },
    },
    {
        path: "history",
        loadChildren: () =>
            import("./modules/history/history.module").then((m) => m.HistoryModule),
        //loadChildren: () => import('./modules/admin/admin.module').then(m => m.AdminModule),
        resolve: { auth: AuthenticationService },
    },
   
    { path: "error", component: ErrorComponent, data: { title: "Error" } },
    { path: "signout", component: SignOutComponent },
    { path: "**", redirectTo: "/error" },
];

@NgModule({
    imports: [
        RouterModule.forRoot(routes, {
            useHash: false,
        }),
    ],
    exports: [RouterModule],
})
export class AppRoutingModule {}
