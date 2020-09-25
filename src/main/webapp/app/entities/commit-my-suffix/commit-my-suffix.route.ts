import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Routes, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { flatMap } from 'rxjs/operators';

import { Authority } from 'app/shared/constants/authority.constants';
import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { ICommitMySuffix, CommitMySuffix } from 'app/shared/model/commit-my-suffix.model';
import { CommitMySuffixService } from './commit-my-suffix.service';
import { CommitMySuffixComponent } from './commit-my-suffix.component';
import { CommitMySuffixDetailComponent } from './commit-my-suffix-detail.component';
import { CommitMySuffixUpdateComponent } from './commit-my-suffix-update.component';

@Injectable({ providedIn: 'root' })
export class CommitMySuffixResolve implements Resolve<ICommitMySuffix> {
  constructor(private service: CommitMySuffixService, private router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<ICommitMySuffix> | Observable<never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        flatMap((commit: HttpResponse<CommitMySuffix>) => {
          if (commit.body) {
            return of(commit.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(new CommitMySuffix());
  }
}

export const commitRoute: Routes = [
  {
    path: '',
    component: CommitMySuffixComponent,
    data: {
      authorities: [Authority.USER],
      pageTitle: 'Commits',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: CommitMySuffixDetailComponent,
    resolve: {
      commit: CommitMySuffixResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'Commits',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: CommitMySuffixUpdateComponent,
    resolve: {
      commit: CommitMySuffixResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'Commits',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: CommitMySuffixUpdateComponent,
    resolve: {
      commit: CommitMySuffixResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'Commits',
    },
    canActivate: [UserRouteAccessService],
  },
];
