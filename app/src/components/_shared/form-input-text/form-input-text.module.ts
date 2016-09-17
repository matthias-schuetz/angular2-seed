import { NgModule } from '@angular/core';

import { SharedModule } from '../shared.module';
import { FormInputTextComponent } from './form-input-text.component';

@NgModule({
    imports: [SharedModule],
    exports: [FormInputTextComponent],
    declarations: [FormInputTextComponent]
})

export class FormInputTextModule {}
