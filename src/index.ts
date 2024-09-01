import CLI from "./CLI";
import GithubEventRepository from "./GithubEventRepository";

const onNewLine = async (line: string) => {
    //const fetch = new FetchEvent(line);
    //const events = await fetch.findAll();

    const eventRepo = new GithubEventRepository();
    const events = await eventRepo.findAll();

    const results = Object.groupBy(events, ({ type }) => type);
    for (const key in results) {
        if (!results[key]) continue;
        console.log(`${key} ${results[key].length}`);
    }
}

const cli = new CLI();
cli.onLineListener(onNewLine);
cli.onCloseListener(() => console.log('Tchuss!'));
cli.start(() => console.log('Type you GitHub username and get info!'));
