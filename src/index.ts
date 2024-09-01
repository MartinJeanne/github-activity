console.log('hello world');
const userUrl = 'https://api.github.com/users/MartinJeanne/events'

async function fetchGitHubActivity() {
    const data = await fetch(userUrl)
        .then(json => json.json())
        .catch(console.error);
    console.log(data);
}

fetchGitHubActivity();
