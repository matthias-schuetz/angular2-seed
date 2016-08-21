import { RouterModule }  from '@angular/router';

import { DashboardComponent } from './dashboard.component';

export const routing = RouterModule.forChild([
    {
        path: '',
        component: DashboardComponent
    }
]);
