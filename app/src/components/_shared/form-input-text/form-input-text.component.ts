import { Component, Input } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
    moduleId: module.id,
    selector: 'form-input-text',
    templateUrl: './form-input-text.component.html'
})

export class FormInputTextComponent {
    @Input() inputId: string;
    @Input() inputType: string;
    @Input() inputControl: FormControl;
}
