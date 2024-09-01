export interface GitHubEvent {
    id: string;
    type: GitHubEventType;
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
    payload: any;
    public: boolean;
    created_at: string;
};

export enum GitHubEventType {
    CheckRun = "CheckRunEvent",
    CheckSuite = "CheckSuiteEvent",
    CommitComment = "CommitCommentEvent",
    Create = "CreateEvent",
    Delete = "DeleteEvent",
    Deployment = "DeploymentEvent",
    DeploymentStatus = "DeploymentStatusEvent",
    Fork = "ForkEvent",
    Gollum = "GollumEvent",
    IssueComment = "IssueCommentEvent",
    Issues = "IssuesEvent",
    Label = "LabelEvent",
    Member = "MemberEvent",
    Membership = "MembershipEvent",
    Milestone = "MilestoneEvent",
    Public = "PublicEvent",
    PullRequest = "PullRequestEvent",
    PullRequestReview = "PullRequestReviewEvent",
    PullRequestReviewComment = "PullRequestReviewCommentEvent",
    Push = "PushEvent",
    Release = "ReleaseEvent",
    Repository = "RepositoryEvent",
    Status = "StatusEvent",
    Watch = "WatchEvent"
}


function isGitHubEvent(event: any): event is GitHubEvent {
    return (
        typeof event === 'object' &&
        typeof event.id === 'string' &&
        isGitHubEventType(event.type) &&
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

export function isGitHubEventType(type: any): type is GitHubEventType {
    return Object.values(GitHubEventType).includes(type);
}

export function isGitHubEventArray(events: any[]): events is GitHubEvent[] {
    return Array.isArray(events) && events.every(isGitHubEvent)
}
