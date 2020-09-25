import { IBranchMySuffix } from 'app/shared/model/branch-my-suffix.model';

export interface IRepoMySuffix {
  id?: number;
  url?: string;
  username?: string;
  password?: string;
  branches?: IBranchMySuffix[];
}

export class RepoMySuffix implements IRepoMySuffix {
  constructor(
    public id?: number,
    public url?: string,
    public username?: string,
    public password?: string,
    public branches?: IBranchMySuffix[]
  ) {}
}
