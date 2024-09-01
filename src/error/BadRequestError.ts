export default class BadRequestError extends Error {
    constructor(username: string) {
        super(`Bad request, this is not a valid username: ${username}`);
    }
}
