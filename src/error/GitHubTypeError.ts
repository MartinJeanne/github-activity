export default class GitHubTypeError extends Error {
    constructor(type: string) {
        super(`Result is not of type: ${type}`);
    }
}
