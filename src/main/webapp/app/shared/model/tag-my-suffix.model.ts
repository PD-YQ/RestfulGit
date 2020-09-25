export interface ITagMySuffix {
  id?: number;
}

export class TagMySuffix implements ITagMySuffix {
  constructor(public id?: number) {}
}
