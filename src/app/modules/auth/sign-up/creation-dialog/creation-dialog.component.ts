import { Component, Inject, OnInit } from "@angular/core";
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import { ManagementEntity } from "@core/services/management-entity/management-entity.interface";
import { ManagementEntityService } from "@core/services/management-entity/management-entity.service";


@Component({
    selector   : 'auth-creation-dialog',
    templateUrl: './creation-dialog.component.html'
})
export class CreationDialogComponent implements OnInit {

    loading = false;
    message =""
    error = false;

    constructor(
        @Inject(MAT_DIALOG_DATA) public data: ManagementEntity,
        private dialogRef: MatDialogRef<CreationDialogComponent>,
        private managementEntityService: ManagementEntityService
    ) { }

    ngOnInit(): void {
        this.create();
    }

    create(): void {
        this.loading = true;
        this.managementEntityService.create(this.data)
            .subscribe({
                next: () => {
                    this.loading = false;
                    this.message = "Creation success";
                    this.error = false;
                    this.dialogRef.close("success");
                },
                error: () => {
                    this.loading = false;
                    this.message = "Creation error";
                    this.error = true;
                }
            });
    }


    close(): void {
        if (this.error) {
            this.dialogRef.close("error");
        }

        else {
            this.dialogRef.close("success");
        }
    }
}