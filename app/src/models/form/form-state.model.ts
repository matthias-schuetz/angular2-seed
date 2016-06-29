export class FormStateModel {
    submitting: boolean;
    submitError: boolean;
    submitErrorMessage: string;

    constructor() {
        this.submitting = false;
        this.submitError = false;
    }
}
