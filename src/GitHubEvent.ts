export interface GitHubEvent {
    id: string;
    type: string;
    actor: {
        id: number;
        login: string;
        display_login?: string;
        gravatar_id: string;
        url: string;
        avatar_url: string;
    };
    repo: {
        id: number;
        name: string;
        url: string;
    };
    org?: {
        id: number;
        login: string;
        gravatar_id: string;
        url: string;
        avatar_url: string;
    };
    payload: object;
    public: boolean;
    created_at: string;
};

function isGitHubEvent(event: any): event is GitHubEvent {
    return (
        typeof event === 'object' &&
        typeof event.id === 'string' &&
        typeof event.type === 'string' &&
        typeof event.actor === 'object' &&
        typeof event.actor.id === 'number' &&
        typeof event.actor.login === 'string' &&
        typeof event.actor.gravatar_id === 'string' &&
        typeof event.actor.url === 'string' &&
        typeof event.actor.avatar_url === 'string' &&
        typeof event.repo === 'object' &&
        typeof event.repo.id === 'number' &&
        typeof event.repo.name === 'string' &&
        typeof event.repo.url === 'string' &&
        (event.org === undefined ||
            (typeof event.org === 'object' &&
                typeof event.org.id === 'number' &&
                typeof event.org.login === 'string' &&
                typeof event.org.gravatar_id === 'string' &&
                typeof event.org.url === 'string' &&
                typeof event.org.avatar_url === 'string')) &&
        typeof event.payload === 'object' &&
        typeof event.public === 'boolean' &&
        typeof event.created_at === 'string'
    );
}

export function isGitHubEventArray(events: any[]): events is GitHubEvent[] {
    return Array.isArray(events) && events.every(isGitHubEvent)
}
