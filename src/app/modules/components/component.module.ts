import { NgModule } from "@angular/core";
import { TeamListComponent } from "./team-list/team-list.component";
import { TeamFormComponent } from "./team-form/team-form.component";
import { MemberFormComponent } from "./member-form/member-form.component";
import { MatDialogModule } from "@angular/material/dialog";
import { MatIconModule } from "@angular/material/icon";
import { SharedModule } from "@shared/shared.module";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatSelectModule } from "@angular/material/select";
import { MatButtonModule } from "@angular/material/button";
import { MatInputModule } from "@angular/material/input";
import { TeamStatComponent } from "./team-stat/team-stat.component";
import { HistoryMenuComponent } from "./history-menu/history-menu.component";
import { MatNativeDateModule } from "@angular/material/core";
import { MatDatepickerModule } from "@angular/material/datepicker";

@NgModule({
    declarations: [
        TeamListComponent,
        TeamFormComponent,
        MemberFormComponent,
        TeamStatComponent,
        HistoryMenuComponent
    ],
    exports: [
        TeamListComponent,
        TeamFormComponent,
        MemberFormComponent,
        TeamStatComponent
    ],
    imports: [
        SharedModule,
        MatDialogModule,
        MatIconModule,
        MatFormFieldModule,
        MatSelectModule,
        MatButtonModule,
        MatButtonModule,
        MatInputModule,
        MatDialogModule,
        MatDatepickerModule,
        MatNativeDateModule,
    ],
    providers: []
})
export class ComponentModule { }