import { Directive, ElementRef } from '@angular/core';

@Directive({
    selector: '[focusable]'
})

export class FocusableDirective {
    constructor(private _el: ElementRef) {}

    setFocus() {
        this._el.nativeElement.focus();
    }
}
