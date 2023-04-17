export class UserAlreadyExistsError extends Error {

    constructor() {
        super('⛔E-mail already in use...')
    }
}