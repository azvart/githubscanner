declare interface ActiveWebHooks {
  id: number;
  name: string;
  active: boolean;
  updated_at: Date;
  created_at: Date;
}

declare interface Owner {
  id: number;
  name: string;
  email: string;
  login: string;
  node_id: string;
  avatar_url: string;
  gravatar_id: string;
  url: string;
  html_url: string;
  followers_url: string;
  following_url: string;
  gists_url: string;
  starred_url: string;
  subscriptions_url: string;
  organizations_url: string;
  repos_url: string;
  events_url: string;
  received_events_url: string;
  type: string;
  site_admin: boolean;
  starred_at: string;
  user_view_type: string;
}

declare interface UserRepository {
  id: number;
  node_id: string;
  name: string;
  full_name: string;
  owner: Owner;
  private: boolean;
  html_url: string;
  description: string;
  fork: boolean;
  url: string;
  forks_url: string;
  archive_url: string;
  assignees_url: string;
  blobs_url: string;
  branches_url: string;
  keys_url: string;
  collaborators_url: string;
  comments_url: string;
  commits_url: string;
  size: number;
  compare_url: string;
  contents_url: string;
  contributors_url: string;
  deployments_url: string;
  downloads_url: string;
  teams_url: string;
  hooks_url: string;
  issue_events_url: string;
  events_url: string;
  activeWebHooks: ActiveWebHooks[];
}
