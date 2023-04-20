export class LateCheckinValidationError extends Error {

    constructor() {
        super('⛔ Too late to validate check-in...')
    }
}