export class FormStateModel {
    public submitting: boolean;
    public submitError: boolean;
    public submitErrorMessage: string;

    constructor() {
        this.submitting = false;
        this.submitError = false;
    }
}
