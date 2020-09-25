import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { ICommitMySuffix } from 'app/shared/model/commit-my-suffix.model';

@Component({
  selector: 'jhi-commit-my-suffix-detail',
  templateUrl: './commit-my-suffix-detail.component.html',
})
export class CommitMySuffixDetailComponent implements OnInit {
  commit: ICommitMySuffix | null = null;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ commit }) => (this.commit = commit));
  }

  previousState(): void {
    window.history.back();
  }
}
