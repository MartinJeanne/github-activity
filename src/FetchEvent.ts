import { GitHubEvent, isGitHubEventArray } from "./GitHubEvent";

export default class FetchEvent {
    url: string;

    constructor(username: string) {
        this.url = `https://api.github.com/users/${username}/events`
    }

    async findAll(): Promise<GitHubEvent[]> {
        const data = await fetch(this.url)
            .then(json => json.json())
            .catch(console.error);

        if (!isGitHubEventArray(data)) {
            throw new Error('Not GitHubEvent');
        }
        return data;
    }
}
