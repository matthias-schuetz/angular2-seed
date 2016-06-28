import { Pipe, PipeTransform } from '@angular/core';
import { Router } from '@angular/router';

@Pipe({
    name: 'isRouteActive',
    pure: false
})

export class IsRouteActive implements PipeTransform {
    constructor(private _router: Router) {}

    transform(route: string) {
        return this._router.url === route;
    }
}
