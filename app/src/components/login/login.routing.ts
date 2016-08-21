import { RouterModule }  from '@angular/router';

import { LoginComponent } from './login.component';

export const routing = RouterModule.forChild([
    {
        path: '',
        component: LoginComponent
    }
]);
