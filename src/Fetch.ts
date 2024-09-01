import UserNotFoundError from "./error/UserNotFoundError";
import { GitHubEvent, isGitHubEventArray } from "./GitHubEventUtils";

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
                else if (res.status === 404) {
                    throw new UserNotFoundError(this.username);
                }
            });

        if (!isGitHubEventArray(data)) {
            throw new Error('Not GitHubEvent');
        }
        return data;
    }
}
