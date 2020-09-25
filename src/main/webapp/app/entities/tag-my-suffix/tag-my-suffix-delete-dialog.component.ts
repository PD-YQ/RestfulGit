import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { ITagMySuffix } from 'app/shared/model/tag-my-suffix.model';
import { TagMySuffixService } from './tag-my-suffix.service';

@Component({
  templateUrl: './tag-my-suffix-delete-dialog.component.html',
})
export class TagMySuffixDeleteDialogComponent {
  tag?: ITagMySuffix;

  constructor(protected tagService: TagMySuffixService, public activeModal: NgbActiveModal, protected eventManager: JhiEventManager) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.tagService.delete(id).subscribe(() => {
      this.eventManager.broadcast('tagListModification');
      this.activeModal.close();
    });
  }
}
