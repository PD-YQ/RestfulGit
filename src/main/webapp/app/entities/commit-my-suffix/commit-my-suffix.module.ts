import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { RestfulGitSharedModule } from 'app/shared/shared.module';
import { CommitMySuffixComponent } from './commit-my-suffix.component';
import { CommitMySuffixDetailComponent } from './commit-my-suffix-detail.component';
import { CommitMySuffixUpdateComponent } from './commit-my-suffix-update.component';
import { CommitMySuffixDeleteDialogComponent } from './commit-my-suffix-delete-dialog.component';
import { commitRoute } from './commit-my-suffix.route';

@NgModule({
  imports: [RestfulGitSharedModule, RouterModule.forChild(commitRoute)],
  declarations: [
    CommitMySuffixComponent,
    CommitMySuffixDetailComponent,
    CommitMySuffixUpdateComponent,
    CommitMySuffixDeleteDialogComponent,
  ],
  entryComponents: [CommitMySuffixDeleteDialogComponent],
})
export class RestfulGitCommitMySuffixModule {}
