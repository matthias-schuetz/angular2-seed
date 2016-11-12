import { NgModule } from '@angular/core';

import { SharedModule } from '../_shared/shared.module';
import { LoginComponent } from './login.component';
import { FormInputTextModule } from '../_shared/form-input-text/form-input-text.module';

@NgModule({
    imports: [SharedModule, FormInputTextModule],
    declarations: [LoginComponent]
})

export class LoginModule {}
