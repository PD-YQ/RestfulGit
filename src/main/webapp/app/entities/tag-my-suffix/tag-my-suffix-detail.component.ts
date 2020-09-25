import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { ITagMySuffix } from 'app/shared/model/tag-my-suffix.model';

@Component({
  selector: 'jhi-tag-my-suffix-detail',
  templateUrl: './tag-my-suffix-detail.component.html',
})
export class TagMySuffixDetailComponent implements OnInit {
  tag: ITagMySuffix | null = null;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ tag }) => (this.tag = tag));
  }

  previousState(): void {
    window.history.back();
  }
}
