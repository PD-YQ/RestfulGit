import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IRepoMySuffix } from 'app/shared/model/repo-my-suffix.model';

@Component({
  selector: 'jhi-repo-my-suffix-detail',
  templateUrl: './repo-my-suffix-detail.component.html',
})
export class RepoMySuffixDetailComponent implements OnInit {
  repo: IRepoMySuffix | null = null;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ repo }) => (this.repo = repo));
  }

  previousState(): void {
    window.history.back();
  }
}
