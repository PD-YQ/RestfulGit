import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared/util/request-util';
import { IRepoMySuffix } from 'app/shared/model/repo-my-suffix.model';

type EntityResponseType = HttpResponse<IRepoMySuffix>;
type EntityArrayResponseType = HttpResponse<IRepoMySuffix[]>;

@Injectable({ providedIn: 'root' })
export class RepoMySuffixService {
  public resourceUrl = SERVER_API_URL + 'api/repos';

  constructor(protected http: HttpClient) {}

  create(repo: IRepoMySuffix): Observable<EntityResponseType> {
    return this.http.post<IRepoMySuffix>(this.resourceUrl, repo, { observe: 'response' });
  }

  update(repo: IRepoMySuffix): Observable<EntityResponseType> {
    return this.http.put<IRepoMySuffix>(this.resourceUrl, repo, { observe: 'response' });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<IRepoMySuffix>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IRepoMySuffix[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }
}
