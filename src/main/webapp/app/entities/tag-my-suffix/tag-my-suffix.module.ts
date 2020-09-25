import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { RestfulGitSharedModule } from 'app/shared/shared.module';
import { TagMySuffixComponent } from './tag-my-suffix.component';
import { TagMySuffixDetailComponent } from './tag-my-suffix-detail.component';
import { TagMySuffixUpdateComponent } from './tag-my-suffix-update.component';
import { TagMySuffixDeleteDialogComponent } from './tag-my-suffix-delete-dialog.component';
import { tagRoute } from './tag-my-suffix.route';

@NgModule({
  imports: [RestfulGitSharedModule, RouterModule.forChild(tagRoute)],
  declarations: [TagMySuffixComponent, TagMySuffixDetailComponent, TagMySuffixUpdateComponent, TagMySuffixDeleteDialogComponent],
  entryComponents: [TagMySuffixDeleteDialogComponent],
})
export class RestfulGitTagMySuffixModule {}
