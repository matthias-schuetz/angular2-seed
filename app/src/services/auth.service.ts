import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Subscriber } from 'rxjs/Subscriber';

import { LoginRequestModel } from '../models/auth/login-request.model';
import { ClientAuthDataModel } from '../models/auth/client-auth-data.model';

@Injectable()

export class AuthService {
    private _isAuthorized: boolean = false;
    private _sessionAuthData: any;

    constructor() {}

    isUserAuthorized(): boolean {
        this._isAuthorized = false;
        this._sessionAuthData = JSON.parse(sessionStorage.getItem('authData'));

        if (this._sessionAuthData && this._sessionAuthData.token) {
            this._authorizeUser(this._sessionAuthData.token);
            this._isAuthorized = true;
        }

        return this._isAuthorized;
    }

    login(loginRequest: LoginRequestModel): Observable<any> {
        return Observable.create((subscriber: Subscriber<any>) => {
            if (loginRequest.username.toLowerCase() === 'user' && loginRequest.password === '123') {
                this._authorizeUser('json-web-token');

                subscriber.next();
                subscriber.complete();
            } else {
                subscriber.error('Invalid username or password');
            }
        });
    }

    logout() {
        this._isAuthorized = false;
        sessionStorage.removeItem('authData');
    }

    private _authorizeUser(token: string) {
        let authData: ClientAuthDataModel = {
            token: token
        };

        this._isAuthorized = true;

        sessionStorage.setItem('authData', JSON.stringify(authData));
    }
}
