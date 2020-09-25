import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { RestfulGitSharedModule } from 'app/shared/shared.module';
import { RepoMySuffixComponent } from './repo-my-suffix.component';
import { RepoMySuffixDetailComponent } from './repo-my-suffix-detail.component';
import { RepoMySuffixUpdateComponent } from './repo-my-suffix-update.component';
import { RepoMySuffixDeleteDialogComponent } from './repo-my-suffix-delete-dialog.component';
import { repoRoute } from './repo-my-suffix.route';

@NgModule({
  imports: [RestfulGitSharedModule, RouterModule.forChild(repoRoute)],
  declarations: [RepoMySuffixComponent, RepoMySuffixDetailComponent, RepoMySuffixUpdateComponent, RepoMySuffixDeleteDialogComponent],
  entryComponents: [RepoMySuffixDeleteDialogComponent],
})
export class RestfulGitRepoMySuffixModule {}
