export default class UserNotFoundError extends Error {
    constructor(username: string) {
        super(`User not found: ${username}`);
    }
}
