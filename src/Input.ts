export default class Input {
    private gitHubUsername: string;

    constructor(gitHubUsername: string) {
        this.gitHubUsername = gitHubUsername;
    }

    getGitHubUsername(): string {
        return this.gitHubUsername;
    }
}
