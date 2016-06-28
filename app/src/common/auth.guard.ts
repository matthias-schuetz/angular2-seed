import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

import { AuthService } from '../services/auth.service';

@Injectable()

export class AuthGuard implements CanActivate {
    constructor(private _router: Router, private _authService: AuthService) {}

    canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        if (this._authService.isUserAuthorized()) {
            return true;
        }

        this._router.navigateByUrl('/login');

        return false;
    }
}

export const AUTH_PROVIDERS = [AuthGuard, AuthService];
