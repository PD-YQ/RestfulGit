export interface ICommitMySuffix {
  id?: number;
  tagId?: number;
  branchId?: number;
}

export class CommitMySuffix implements ICommitMySuffix {
  constructor(public id?: number, public tagId?: number, public branchId?: number) {}
}
