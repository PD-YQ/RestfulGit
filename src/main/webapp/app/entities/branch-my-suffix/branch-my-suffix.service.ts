import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared/util/request-util';
import { IBranchMySuffix } from 'app/shared/model/branch-my-suffix.model';

type EntityResponseType = HttpResponse<IBranchMySuffix>;
type EntityArrayResponseType = HttpResponse<IBranchMySuffix[]>;

@Injectable({ providedIn: 'root' })
export class BranchMySuffixService {
  public resourceUrl = SERVER_API_URL + 'api/branches';

  constructor(protected http: HttpClient) {}

  create(branch: IBranchMySuffix): Observable<EntityResponseType> {
    return this.http.post<IBranchMySuffix>(this.resourceUrl, branch, { observe: 'response' });
  }

  update(branch: IBranchMySuffix): Observable<EntityResponseType> {
    return this.http.put<IBranchMySuffix>(this.resourceUrl, branch, { observe: 'response' });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<IBranchMySuffix>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IBranchMySuffix[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }
}
