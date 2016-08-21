import { RouterModule }  from '@angular/router';

import { ErrorComponent } from './error.component';

export const routing = RouterModule.forChild([
    {
        path: 'error',
        component: ErrorComponent
    }
]);
