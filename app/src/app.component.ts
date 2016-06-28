import { Component } from '@angular/core';
import { Router, ROUTER_DIRECTIVES } from '@angular/router';
import {IsRouteActive} from './pipes/is-route-active.pipe';
import {AuthService} from './services/auth.service';

@Component({
    selector: 'app',
    templateUrl: 'src/app.component.html',
    styleUrls: ['styles/components/app.css'],
    providers: [],
    directives: [ROUTER_DIRECTIVES],
    pipes: [IsRouteActive]
})

export class AppComponent {
    public isUserAuthorized: boolean = false;

    constructor(private _router: Router, private _authService: AuthService) {
        this._router.events.subscribe(() => {
            this.isUserAuthorized = this._authService.isUserAuthorized();
        });
    }

    public logout() {
        this._authService.logout();
        this._router.navigateByUrl('/');
    }
}
