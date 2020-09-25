import { ICommitMySuffix } from 'app/shared/model/commit-my-suffix.model';
import { BranchStatus } from 'app/shared/model/enumerations/branch-status.model';

export interface IBranchMySuffix {
  id?: number;
  name?: string;
  status?: BranchStatus;
  commits?: ICommitMySuffix[];
  repoId?: number;
}

export class BranchMySuffix implements IBranchMySuffix {
  constructor(
    public id?: number,
    public name?: string,
    public status?: BranchStatus,
    public commits?: ICommitMySuffix[],
    public repoId?: number
  ) {}
}
