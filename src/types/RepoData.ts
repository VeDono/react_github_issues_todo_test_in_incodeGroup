import { OwnerType } from './OwnerType';

export interface RepoData {
  name: string;
  html_url: string;
  owner: OwnerType;
  stargazers_count: null | number;
}
