import BadRequestError from "./error/BadRequestError";
import GitHubTypeError from "./error/GitHubTypeError";
import UserNotFoundError from "./error/UserNotFoundError";
import { GitHubEvent, GitHubEventType, isGitHubEventArray } from "./GitHubEventUtils";

export default class Fetch {
    private username: string;
    private url: string;

    constructor(username: string) {
        this.username = username;
        this.url = `https://api.github.com/users/${username}/events`
    }

    async findAll(): Promise<GitHubEvent[]> {
        const data = await fetch(this.url)
            .then(res => {
                if (res.ok) return res.json();
                else if (res.status === 404) throw new UserNotFoundError(this.username);
                else if (res.status === 400) throw new BadRequestError(this.username);
                else throw new Error(`${res}`);
            });

        if (!isGitHubEventArray(data)) {
            throw new GitHubTypeError(typeof GitHubEventType);
        }
        return data;
    }
}
