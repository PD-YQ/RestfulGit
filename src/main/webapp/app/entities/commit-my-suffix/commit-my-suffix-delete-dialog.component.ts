import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { ICommitMySuffix } from 'app/shared/model/commit-my-suffix.model';
import { CommitMySuffixService } from './commit-my-suffix.service';

@Component({
  templateUrl: './commit-my-suffix-delete-dialog.component.html',
})
export class CommitMySuffixDeleteDialogComponent {
  commit?: ICommitMySuffix;

  constructor(
    protected commitService: CommitMySuffixService,
    public activeModal: NgbActiveModal,
    protected eventManager: JhiEventManager
  ) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.commitService.delete(id).subscribe(() => {
      this.eventManager.broadcast('commitListModification');
      this.activeModal.close();
    });
  }
}
