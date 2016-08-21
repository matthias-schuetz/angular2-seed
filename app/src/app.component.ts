import { Component, } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from './services/auth.service';

@Component({
    selector: 'app',
    templateUrl: 'src/app.component.html',
    styleUrls: ['styles/components/app.css']
})

export class AppComponent {
    isUserAuthorized: boolean = false;

    constructor(private _router: Router, private _authService: AuthService) {
        this._router.events.subscribe(() => {
            this.isUserAuthorized = this._authService.isUserAuthorized();
        });
    }

    logout() {
        this._authService.logout();
        this._router.navigateByUrl('/');
    }
}
