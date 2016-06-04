import { Component } from '@angular/core';
import { Location } from '@angular/common';
import { Router, Routes, ROUTER_DIRECTIVES } from '@angular/router';

import { AuthService } from '../../services/auth.service';
import { IsRouteActive } from '../../pipes/is-route-active.pipe';
import { RouteDefinitions, PublicRoutes } from '../../routes';

@Component({
	selector: 'app',
	templateUrl: 'src/components/app/app.component.html',
	styleUrls: ['styles/components/app.css'],
	providers: [AuthService],
	directives: [ROUTER_DIRECTIVES],
	pipes: [IsRouteActive]
})

@Routes(RouteDefinitions)

export class AppComponent {
	private _currentRoute: any;
	private _isPublicPage: boolean;

	public isUserAuthorized: boolean = false;

	constructor(private _router: Router, private _location: Location, private _authService: AuthService) {
		this._router.changes.subscribe(() => {
			this._currentRoute = this._location.path();
			this._isPublicPage = PublicRoutes.indexOf(this._location.path()) !== -1;
			this.isUserAuthorized = this._authService.isUserAuthorized();

			if (!this.isUserAuthorized && !this._isPublicPage) {
				this._router.navigateByUrl('/login');
			} else if (this.isUserAuthorized && (this._currentRoute === '' || this._currentRoute === 'login')) {
				this._router.navigateByUrl('/dashboard');
			}
		});
	}

	public logout() {
		this._authService.logout();
		this._router.navigateByUrl('/');
	}
}