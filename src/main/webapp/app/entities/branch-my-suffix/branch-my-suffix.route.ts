import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Routes, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { flatMap } from 'rxjs/operators';

import { Authority } from 'app/shared/constants/authority.constants';
import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { IBranchMySuffix, BranchMySuffix } from 'app/shared/model/branch-my-suffix.model';
import { BranchMySuffixService } from './branch-my-suffix.service';
import { BranchMySuffixComponent } from './branch-my-suffix.component';
import { BranchMySuffixDetailComponent } from './branch-my-suffix-detail.component';
import { BranchMySuffixUpdateComponent } from './branch-my-suffix-update.component';

@Injectable({ providedIn: 'root' })
export class BranchMySuffixResolve implements Resolve<IBranchMySuffix> {
  constructor(private service: BranchMySuffixService, private router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IBranchMySuffix> | Observable<never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        flatMap((branch: HttpResponse<BranchMySuffix>) => {
          if (branch.body) {
            return of(branch.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(new BranchMySuffix());
  }
}

export const branchRoute: Routes = [
  {
    path: '',
    component: BranchMySuffixComponent,
    data: {
      authorities: [Authority.USER],
      pageTitle: 'Branches',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: BranchMySuffixDetailComponent,
    resolve: {
      branch: BranchMySuffixResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'Branches',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: BranchMySuffixUpdateComponent,
    resolve: {
      branch: BranchMySuffixResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'Branches',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: BranchMySuffixUpdateComponent,
    resolve: {
      branch: BranchMySuffixResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'Branches',
    },
    canActivate: [UserRouteAccessService],
  },
];
