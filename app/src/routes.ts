import { provideRouter, RouterConfig } from '@angular/router';

import { AuthGuard, AUTH_PROVIDERS } from './common/auth.guard';

import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { ErrorComponent } from './components/error/error.component';

export const Routes: RouterConfig = [
    {
        path: '',
        component: HomeComponent
    },
    {
        path: 'login',
        component: LoginComponent
    },
    {
        path: 'dashboard',
        component: DashboardComponent,
        canActivate: [AuthGuard]
    },
    {
        path: 'error',
        component: ErrorComponent
    },
    {
        path: '**',
        redirectTo: 'error'
    }
];

export const PRECOMPILE_COMPONENTS = [
    HomeComponent,
    LoginComponent,
    DashboardComponent,
    ErrorComponent
];

export const APP_ROUTER_PROVIDERS = [
    provideRouter(Routes),
    AUTH_PROVIDERS
];
