import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { IRepoMySuffix } from 'app/shared/model/repo-my-suffix.model';
import { RepoMySuffixService } from './repo-my-suffix.service';
import { RepoMySuffixDeleteDialogComponent } from './repo-my-suffix-delete-dialog.component';

@Component({
  selector: 'jhi-repo-my-suffix',
  templateUrl: './repo-my-suffix.component.html',
})
export class RepoMySuffixComponent implements OnInit, OnDestroy {
  repos?: IRepoMySuffix[];
  eventSubscriber?: Subscription;

  constructor(protected repoService: RepoMySuffixService, protected eventManager: JhiEventManager, protected modalService: NgbModal) {}

  loadAll(): void {
    this.repoService.query().subscribe((res: HttpResponse<IRepoMySuffix[]>) => (this.repos = res.body || []));
  }

  ngOnInit(): void {
    this.loadAll();
    this.registerChangeInRepos();
  }

  ngOnDestroy(): void {
    if (this.eventSubscriber) {
      this.eventManager.destroy(this.eventSubscriber);
    }
  }

  trackId(index: number, item: IRepoMySuffix): number {
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
    return item.id!;
  }

  registerChangeInRepos(): void {
    this.eventSubscriber = this.eventManager.subscribe('repoListModification', () => this.loadAll());
  }

  delete(repo: IRepoMySuffix): void {
    const modalRef = this.modalService.open(RepoMySuffixDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.repo = repo;
  }
}
