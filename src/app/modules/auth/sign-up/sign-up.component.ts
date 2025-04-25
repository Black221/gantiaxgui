import { AfterViewInit, ChangeDetectorRef, Component, OnInit, viewChild, ViewChild, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup, NgForm, UntypedFormGroup, Validators } from '@angular/forms';
import { AuthService } from '@core/auth/auth.service';
import { animations } from '@lhacksrt/animations';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { ManagementEntity } from '@core/services/management-entity/management-entity.interface';
import { CreationDialogComponent } from './creation-dialog/creation-dialog.component';

@Component({
    selector     : 'auth-sign-up',
    templateUrl  : './sign-up.component.html',
    encapsulation: ViewEncapsulation.None,
    animations   : animations
})
export class AuthSignUpComponent implements OnInit {
    

    formGroup!: UntypedFormGroup;
    @ViewChild('form') form!: NgForm;

    showAlert: boolean = false;
     
    formStepOne!: UntypedFormGroup;
    formStepTwo!: UntypedFormGroup;
    formStepThree!: UntypedFormGroup;
    formStepFour!: UntypedFormGroup;

    selectedIndex: number = 0;
         
    constructor(
        private dialog: MatDialog,
        private fb: FormBuilder,
        private _authService: AuthService,
        private _router: Router
    ) { 
       
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Lifecycle hooks
    // -----------------------------------------------------------------------------------------------------

    /**
     * On init
     */
    ngOnInit(): void {
        
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    onStepOneNext(fromGroup: UntypedFormGroup): void {
        this.formStepOne = fromGroup;
    }

    onStepTwoNext(fromGroup: UntypedFormGroup): void {
        this.formStepTwo = fromGroup;
    }

    onStepThreeNext(fromGroup: UntypedFormGroup): void {
        this.formStepThree = fromGroup;
    }

    onStepFourNext(fromGroup: UntypedFormGroup): void {
        this.formStepFour = fromGroup;
    }

    createUser(): void {}

    createEntity(): void {}
}
