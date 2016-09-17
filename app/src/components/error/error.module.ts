import { NgModule } from '@angular/core';

import { SharedModule } from '../_shared/shared.module';
import { ErrorComponent } from './error.component';
import { routing } from './error.routing';

@NgModule({
    imports: [SharedModule, routing],
    declarations: [ErrorComponent]
})

export class ErrorModule {}
