import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared/util/request-util';
import { ITagMySuffix } from 'app/shared/model/tag-my-suffix.model';

type EntityResponseType = HttpResponse<ITagMySuffix>;
type EntityArrayResponseType = HttpResponse<ITagMySuffix[]>;

@Injectable({ providedIn: 'root' })
export class TagMySuffixService {
  public resourceUrl = SERVER_API_URL + 'api/tags';

  constructor(protected http: HttpClient) {}

  create(tag: ITagMySuffix): Observable<EntityResponseType> {
    return this.http.post<ITagMySuffix>(this.resourceUrl, tag, { observe: 'response' });
  }

  update(tag: ITagMySuffix): Observable<EntityResponseType> {
    return this.http.put<ITagMySuffix>(this.resourceUrl, tag, { observe: 'response' });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<ITagMySuffix>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<ITagMySuffix[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }
}
