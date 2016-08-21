import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { FocusableDirective } from '../../directives/focusable.directive';
import { IsRouteActive } from '../../pipes/is-route-active.pipe';

@NgModule({
    imports: [CommonModule],
    declarations: [FocusableDirective, IsRouteActive],
    exports: [FocusableDirective, IsRouteActive, CommonModule, FormsModule, ReactiveFormsModule, RouterModule]
})

export class SharedModule {}
