import fs from 'node:fs/promises';
import { GitHubEvent, isGitHubEventArray } from './GitHubEvent';


export default class GithubEventRepository {
    private path: string = './events.json';

    constructor() { }

    async findAll(): Promise<GitHubEvent[]> {
        const events = await fs.readFile(this.path, { encoding: 'utf8' })
            .then(json => JSON.parse(json))
            .catch(async e => {
                if (e.code === 'ENOENT') {
                    await this.overwriteAll([]);
                    return [];
                }
                else console.error(e);
            });

        if (!isGitHubEventArray(events)) {
            throw new Error('Not GitHubEvent');
        }
        return events;
    }

    async overwriteAll(gitHubEvents: GitHubEvent[]) {
        const json = JSON.stringify(gitHubEvents);
        await fs.writeFile(this.path, json, { encoding: 'utf8' });
    }
}
