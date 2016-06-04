import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { LoginRequestModel } from '../models/auth/login-request.model';
import { ClientAuthDataModel } from '../models/auth/client-auth-data.model';

@Injectable()

export class AuthService {
	private _authData: ClientAuthDataModel;
	private _sessionAuthData: any;

	constructor() {
		this._resetAuthData();
	}

	private _authorizeUser(token: string) {
		this._authData = {
			token: token
		};

		sessionStorage.setItem('authData', JSON.stringify(this._authData));
	}

	private _resetAuthData() {
		this._authData = {
			token: null
		};
	}

	public isUserAuthorized(): boolean {
		let isAuthorized: boolean = this._authData.token ? true : false;

		if (!isAuthorized) {
			this._sessionAuthData = JSON.parse(sessionStorage.getItem('authData'));

			if (this._sessionAuthData && this._sessionAuthData.token) {
				this._authorizeUser(this._sessionAuthData.token);
				isAuthorized = true;
			}
		}

		return isAuthorized;
	}

	public login(loginRequest: LoginRequestModel): Observable<any> {
		return Observable.create((subscriber) => {
			if (loginRequest.username.toLowerCase() === 'user' && loginRequest.password === '123') {
				this._authorizeUser('json-web-token');

				subscriber.next();
				subscriber.complete();
			} else {
				subscriber.error('Invalid username or password');
			}
		});
	}

	public logout() {
		this._resetAuthData();
		sessionStorage.removeItem('authData');
	}
}