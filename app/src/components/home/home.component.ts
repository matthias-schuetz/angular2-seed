import { Component } from '@angular/core';
import { ROUTER_DIRECTIVES } from '@angular/router';

@Component({
	selector: 'home',
	templateUrl: 'src/components/home/home.component.html',
	styleUrls: ['styles/components/home.css'],
	providers: [],
	directives: [ROUTER_DIRECTIVES],
	pipes: []
})

export class HomeComponent {
	constructor() {}
}