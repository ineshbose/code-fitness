declare type Commit = {
  author_avatar_url: string;
  author_date: string;
  author_email: string;
  author_html_url: string;
  author_name: string;
  author_url: string;
  author_username: string;
  branch: string;
  committer_avatar_url: string;
  committer_date: string;
  committer_email: string;
  committer_html_url: string;
  committer_name: string;
  committer_url: string;
  committer_username: string;
  created_at: string;
  hash: string;
  html_url: string;
  human_readable_total: string;
  human_readable_total_with_seconds: string;
  id: string;
  message: string;
  ref: string;
  total_seconds: number;
  truncated_hash: string;
  url: string;
};

declare type Repository = {
  default_branch: string;
  description: string;
  fork_count: number;
  full_name: string;
  homepage: string;
  html_url: string;
  id: string;
  is_fork: boolean;
  is_private: boolean;
  last_synced_at: string;
  name: string;
  provider: string;
  star_count: number;
  url: string;
  watch_count: number;
};

declare type Project = {
  id: string;
  name: string;
  privacy: string;
  repository: Repository;
};

declare type Response = {
  commit: Commit;
  branch: string;
  project: Project;
};
