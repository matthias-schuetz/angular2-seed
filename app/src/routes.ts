import { Route } from '@angular/router';

import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { ErrorComponent } from './components/error/error.component';

export const RouteDefinitions: Array<Route> = [
	{
		path: '/',
		component: HomeComponent,
	},
	{
		path: '/login',
		component: LoginComponent
	},
	{
		path: '/dashboard',
		component: DashboardComponent
	},
	{
		path: '/error',
		component: ErrorComponent
	},
	{
		path: '*',
		component: ErrorComponent
	}
];

export const PublicRoutes: Array<string> = [
	'',
	'/login',
	'/error'
];