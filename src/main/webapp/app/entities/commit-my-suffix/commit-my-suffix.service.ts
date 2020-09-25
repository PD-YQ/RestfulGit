import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared/util/request-util';
import { ICommitMySuffix } from 'app/shared/model/commit-my-suffix.model';

type EntityResponseType = HttpResponse<ICommitMySuffix>;
type EntityArrayResponseType = HttpResponse<ICommitMySuffix[]>;

@Injectable({ providedIn: 'root' })
export class CommitMySuffixService {
  public resourceUrl = SERVER_API_URL + 'api/commits';

  constructor(protected http: HttpClient) {}

  create(commit: ICommitMySuffix): Observable<EntityResponseType> {
    return this.http.post<ICommitMySuffix>(this.resourceUrl, commit, { observe: 'response' });
  }

  update(commit: ICommitMySuffix): Observable<EntityResponseType> {
    return this.http.put<ICommitMySuffix>(this.resourceUrl, commit, { observe: 'response' });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<ICommitMySuffix>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<ICommitMySuffix[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }
}
