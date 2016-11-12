import { RouterModule } from '@angular/router';

import { AuthGuard } from './common/auth.guard';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { ErrorComponent } from './components/error/error.component';

export const routing = RouterModule.forRoot([
    {
        path: '',
        pathMatch: 'full',
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
]);
