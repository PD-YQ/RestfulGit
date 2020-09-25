import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { RestfulGitSharedModule } from 'app/shared/shared.module';
import { BranchMySuffixComponent } from './branch-my-suffix.component';
import { BranchMySuffixDetailComponent } from './branch-my-suffix-detail.component';
import { BranchMySuffixUpdateComponent } from './branch-my-suffix-update.component';
import { BranchMySuffixDeleteDialogComponent } from './branch-my-suffix-delete-dialog.component';
import { branchRoute } from './branch-my-suffix.route';

@NgModule({
  imports: [RestfulGitSharedModule, RouterModule.forChild(branchRoute)],
  declarations: [
    BranchMySuffixComponent,
    BranchMySuffixDetailComponent,
    BranchMySuffixUpdateComponent,
    BranchMySuffixDeleteDialogComponent,
  ],
  entryComponents: [BranchMySuffixDeleteDialogComponent],
})
export class RestfulGitBranchMySuffixModule {}
