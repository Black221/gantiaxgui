import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { DashboardComponent } from "./dashboard.component";
import { TranslocoCoreModule } from "@core/transloco/transloco.module";
import { MatMenuModule } from "@angular/material/menu";
import { MatIconModule } from "@angular/material/icon";
import { SharedModule } from "@shared/shared.module";

const routes: Routes = [
    {
        path: "",
        component: DashboardComponent
    }
]

@NgModule({
    declarations: [
        DashboardComponent
    ],
    imports: [
        RouterModule.forChild(routes),
        TranslocoCoreModule,
        MatMenuModule,
        MatIconModule,
        SharedModule
    ],
    providers: []
})
export class DashboardModule { }