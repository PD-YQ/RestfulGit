import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IBranchMySuffix } from 'app/shared/model/branch-my-suffix.model';

@Component({
  selector: 'jhi-branch-my-suffix-detail',
  templateUrl: './branch-my-suffix-detail.component.html',
})
export class BranchMySuffixDetailComponent implements OnInit {
  branch: IBranchMySuffix | null = null;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ branch }) => (this.branch = branch));
  }

  previousState(): void {
    window.history.back();
  }
}
