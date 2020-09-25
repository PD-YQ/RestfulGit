import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IRepoMySuffix } from 'app/shared/model/repo-my-suffix.model';
import { RepoMySuffixService } from './repo-my-suffix.service';

@Component({
  templateUrl: './repo-my-suffix-delete-dialog.component.html',
})
export class RepoMySuffixDeleteDialogComponent {
  repo?: IRepoMySuffix;

  constructor(protected repoService: RepoMySuffixService, public activeModal: NgbActiveModal, protected eventManager: JhiEventManager) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.repoService.delete(id).subscribe(() => {
      this.eventManager.broadcast('repoListModification');
      this.activeModal.close();
    });
  }
}
