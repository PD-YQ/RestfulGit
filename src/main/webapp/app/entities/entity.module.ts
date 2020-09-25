import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [
    RouterModule.forChild([
      {
        path: 'tag-my-suffix',
        loadChildren: () => import('./tag-my-suffix/tag-my-suffix.module').then(m => m.RestfulGitTagMySuffixModule),
      },
      {
        path: 'commit-my-suffix',
        loadChildren: () => import('./commit-my-suffix/commit-my-suffix.module').then(m => m.RestfulGitCommitMySuffixModule),
      },
      {
        path: 'branch-my-suffix',
        loadChildren: () => import('./branch-my-suffix/branch-my-suffix.module').then(m => m.RestfulGitBranchMySuffixModule),
      },
      {
        path: 'repo-my-suffix',
        loadChildren: () => import('./repo-my-suffix/repo-my-suffix.module').then(m => m.RestfulGitRepoMySuffixModule),
      },
      /* jhipster-needle-add-entity-route - JHipster will add entity modules routes here */
    ]),
  ],
})
export class RestfulGitEntityModule {}
