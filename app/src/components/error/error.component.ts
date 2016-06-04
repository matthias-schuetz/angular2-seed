import { Component } from '@angular/core';
import { Location } from '@angular/common';
import { Router } from '@angular/router';

@Component({
	selector: 'error',
	templateUrl: 'src/components/error/error.component.html',
	providers: [],
	directives: [],
	pipes: []
})

export class ErrorComponent {
	constructor(private _router: Router, private _location: Location) {
		if (this._location.path() !== '/error') {
			this._router.navigateByUrl('/error').catch(() => {});
		}
	}
}