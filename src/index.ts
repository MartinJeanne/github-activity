import CLI from "./CLI";
import UserNotFoundError from "./error/UserNotFoundError";
import Fetch from "./Fetch";
import { GitHubEventType, isGitHubEventType } from "./GitHubEventUtils";

const onNewLine = async (line: string) => {
    const fetch = new Fetch(line);
    let eventsRaw;
    try {
        eventsRaw = await fetch.findAll();
    } catch (error) {
        if (error instanceof UserNotFoundError) {
            return console.error(error.message);
        }
        else console.error(error);
    }

    console.log(`${line}:`);
    if (!eventsRaw || eventsRaw.length === 0) return console.log('No event.');

    const events = Object.groupBy(eventsRaw, ({ type }) => type);
    for (const key in events) {
        if (!isGitHubEventType(key) || !events[key]) continue;

        switch (key) {
            case GitHubEventType.Push: {
                console.log(`- ${GitHubEventType.Push}`);
                const eventsByRepo = Object.groupBy(events[key], ({ repo }) => repo.name);
                for (const k in eventsByRepo) {
                    if (!eventsByRepo[k]) continue;
                    let commitNb = 0;
                    eventsByRepo[k].forEach((e) => commitNb += e.payload.size);
                    console.log(`   - Pushed ${commitNb} commit(s) to ${k}`);
                }
                break;
            }

            case GitHubEventType.Watch: {
                console.log(`- ${GitHubEventType.Watch}`);
                events[key].forEach((evt) => {
                    console.log(`   - Starred ${evt.repo.name}`)
                });
                break;
            }

            case GitHubEventType.Issues: {
                console.log(`- ${GitHubEventType.Issues}`);
                events[key].forEach((evt) => {
                    console.log(`   - As ${evt.payload.action} an issue on ${evt.repo.name}`)
                });
                break;
            }

            case GitHubEventType.Create: {
                console.log(`- ${GitHubEventType.Create}`);
                events[key].forEach((evt) => {
                    let linkWork = 'on';
                    if (evt.payload.ref_type === 'repository') linkWork = 'which is'
                    console.log(`   - As created a ${evt.payload.ref_type} ${linkWork} ${evt.repo.name}`)
                });
                break;
            }

            case GitHubEventType.Delete: {
                console.log(`- ${GitHubEventType.Delete}`);
                events[key].forEach((evt) => {
                    console.log(`   - As deleted a ${evt.payload.ref_type} on ${evt.repo.name}`)
                });
                break;
            }

            case GitHubEventType.IssueComment: {
                console.log(`- ${GitHubEventType.IssueComment}`);
                events[key].forEach((evt) => {
                    console.log(`   - As ${evt.payload.action} an issue comment on ${evt.repo.name}`)
                });
                break;
            }

            case GitHubEventType.Public: {
                console.log(`- ${GitHubEventType.Public}`);
                events[key].forEach((evt) => {
                    console.log(`   - As made public the repo ${evt.repo.name}`)
                });
                break;
            }

            case GitHubEventType.PullRequest: {
                console.log(`- ${GitHubEventType.PullRequest}`);
                events[key].forEach((evt) => {
                    console.log(`   - As ${evt.payload.action} pull request ${evt.payload.number} on ${evt.repo.name}`)
                });
                break;
            }

            case GitHubEventType.PullRequestReview: {
                console.log(`- ${GitHubEventType.PullRequestReview}`);
                events[key].forEach((evt) => {
                    console.log(`   - As ${evt.payload.action} a pull request review on ${evt.repo.name}`)
                });
                break;
            }

            case GitHubEventType.Release: {
                console.log(`- ${GitHubEventType.Release}`);
                events[key].forEach((evt) => {
                    console.log(`   - As ${evt.payload.action} the release ${evt.payload.release.name} on ${evt.repo.name}`)
                });
                break;
            }

            default:
                break;

        }
    }
}

const cli = new CLI();
cli.onLineListener(onNewLine);
cli.onCloseListener(() => console.log('Tchuss!'));
cli.start(() => console.log('Type you GitHub username and get info!'));
