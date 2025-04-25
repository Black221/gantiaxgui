import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Team } from '@core/services/team/team.interface';

@Component({
    selector: 'module-pointages-team-form',
    templateUrl: './team-form.component.html'
})
export class TeamFormComponent {
    form: FormGroup;

    constructor(
        private _formBuilder: FormBuilder,
        @Inject(MAT_DIALOG_DATA) private _data: { team: Team },
        private _matDialogRef: MatDialogRef<TeamFormComponent>
    ) {
        this.form = this._formBuilder.group({
            name: ['', [Validators.required]],
        });

        // If we have team data, patch the form
        if (this._data.team) {
            this.form.patchValue(this._data.team);
        }
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    /**
     * Save and close
     */
    saveAndClose(): void {
        // Make sure the form is valid
        if (this.form.invalid) {
            return;
        }

        // Get the form data
        const formData = this.form.getRawValue();

        // Close the dialog and pass the form data
        this._matDialogRef.close(formData);
    }
}
