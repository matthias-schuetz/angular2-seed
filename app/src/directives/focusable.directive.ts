import {Directive, ElementRef} from '@angular/core';

@Directive({
    selector: '[focusable]'
})

export class FocusableDirective {
    constructor(private el: ElementRef) {}

    setFocus() {
        this.el.nativeElement.focus();
    }
}
