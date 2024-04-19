import { Reactions } from './Reactions';
import { User } from './User';

export interface Issue {
  url: string;
  repository_url: string;
  labels_url: string;
  comments_url: string;
  events_url: string;
  html_url: string;
  id: number;
  node_id: string;
  number: number;
  title: string;
  user: User;
  labels: unknown[];
  state: string;
  locked: boolean;
  assignee: null | string;
  assignees: unknown[];
  milestone: null | string;
  comments: number;
  created_at: string;
  updated_at: string;
  closed_at: null | string;
  author_association: string;
  active_lock_reason: null | string;
  body: string;
  reactions: Reactions;
  timeline_url: string;
  performed_via_github_app: null | string;
  state_reason: null | string;
}
