export class DoubleCheckinError extends Error {

    constructor() {
        super("⛔Can't check in twice in one day...")
    }
}