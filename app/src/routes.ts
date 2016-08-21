import { RouterModule } from '@angular/router';

import { AuthGuard } from './common/auth.guard';

export const routing = RouterModule.forRoot([
    {
        path: '',
        pathMatch: 'full',
        loadChildren: 'src/components/home/home.module'
    },
    {
        path: 'login',
        loadChildren: 'src/components/login/login.module'
    },
    {
        path: 'dashboard',
        loadChildren: 'src/components/dashboard/dashboard.module',
        canActivate: [AuthGuard]
    },
    {
        path: 'error',
        loadChildren: 'src/components/error/error.module',
    },
    {
        path: '**',
        redirectTo: 'error'
    }
]);
