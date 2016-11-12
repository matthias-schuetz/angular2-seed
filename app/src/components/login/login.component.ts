import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { AuthService } from '../../services/auth.service';
import { FormStateModel } from '../../models/form/form-state.model';
import { LoginRequestModel } from '../../models/auth/login-request.model';

@Component({
    moduleId: module.id,
    selector: 'login',
    templateUrl: './login.component.html'
})

export class LoginComponent {
    formState: FormStateModel;
    loginForm: FormGroup;

    private _loginRequest: LoginRequestModel;

    constructor(private _formBuilder: FormBuilder, private _router: Router, private _authService: AuthService) {
        if (this._authService.isUserAuthorized()) {
            this._router.navigate(['/dashboard']);
        }

        this.formState = new FormStateModel();

        this.loginForm = this._formBuilder.group({
            'username': ['', Validators.required],
            'password': ['', Validators.required]
        });

        this.loginForm.valueChanges.subscribe(() => {
            this.formState.submitError = false;
        });
    }

    onLoginFormSubmit() {
        this._loginRequest = new LoginRequestModel();
        this._loginRequest.username = this.loginForm.value.username;
        this._loginRequest.password = this.loginForm.value.password;

        this.formState.submitting = true;
        this.formState.submitError = false;

        this._authService.login(this._loginRequest).subscribe(() => {
            this._router.navigate(['/dashboard']);
        }, (errorMessage: string) => {
            this.formState.submitting = false;
            this.formState.submitError = true;
            this.formState.submitErrorMessage = errorMessage;
        });
    }
}
