import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Member } from '@core/services/member/member.interface';
import { Category } from '@core/services/category/category.interface';

@Component({
    selector: 'module-pointages-member-form',
    templateUrl: './member-form.component.html'
})
export class MemberFormComponent {
    form: FormGroup;

    constructor(
        private _formBuilder: FormBuilder,
        @Inject(MAT_DIALOG_DATA) private _data: { member: Member, teamId: string, categories: Category[] },
        private _matDialogRef: MatDialogRef<MemberFormComponent>
    ) {
        this.form = this._formBuilder.group({
            firstname: ['', [Validators.required]],
            lastname: ['', [Validators.required]],
            category: [this._data.categories[0]?.id || "", [Validators.required]],
        });

        // If we have member data, patch the form
        if (this._data.member) {
            this.form.patchValue(this._data.member);
        }
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    get categories(): Category[] {
        return this._data.categories;
    }
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
        console.log(formData);

        // Add the team ID
        formData.teamId = this._data.teamId;

        // Close the dialog and pass the form data
        this._matDialogRef.close(formData);
    }
}
