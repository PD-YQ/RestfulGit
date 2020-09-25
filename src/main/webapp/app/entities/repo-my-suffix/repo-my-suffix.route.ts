import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Routes, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { flatMap } from 'rxjs/operators';

import { Authority } from 'app/shared/constants/authority.constants';
import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { IRepoMySuffix, RepoMySuffix } from 'app/shared/model/repo-my-suffix.model';
import { RepoMySuffixService } from './repo-my-suffix.service';
import { RepoMySuffixComponent } from './repo-my-suffix.component';
import { RepoMySuffixDetailComponent } from './repo-my-suffix-detail.component';
import { RepoMySuffixUpdateComponent } from './repo-my-suffix-update.component';

@Injectable({ providedIn: 'root' })
export class RepoMySuffixResolve implements Resolve<IRepoMySuffix> {
  constructor(private service: RepoMySuffixService, private router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IRepoMySuffix> | Observable<never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        flatMap((repo: HttpResponse<RepoMySuffix>) => {
          if (repo.body) {
            return of(repo.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(new RepoMySuffix());
  }
}

export const repoRoute: Routes = [
  {
    path: '',
    component: RepoMySuffixComponent,
    data: {
      authorities: [Authority.USER],
      pageTitle: 'Repos',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: RepoMySuffixDetailComponent,
    resolve: {
      repo: RepoMySuffixResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'Repos',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: RepoMySuffixUpdateComponent,
    resolve: {
      repo: RepoMySuffixResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'Repos',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: RepoMySuffixUpdateComponent,
    resolve: {
      repo: RepoMySuffixResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'Repos',
    },
    canActivate: [UserRouteAccessService],
  },
];
