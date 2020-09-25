import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IBranchMySuffix } from 'app/shared/model/branch-my-suffix.model';
import { BranchMySuffixService } from './branch-my-suffix.service';

@Component({
  templateUrl: './branch-my-suffix-delete-dialog.component.html',
})
export class BranchMySuffixDeleteDialogComponent {
  branch?: IBranchMySuffix;

  constructor(
    protected branchService: BranchMySuffixService,
    public activeModal: NgbActiveModal,
    protected eventManager: JhiEventManager
  ) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.branchService.delete(id).subscribe(() => {
      this.eventManager.broadcast('branchListModification');
      this.activeModal.close();
    });
  }
}
