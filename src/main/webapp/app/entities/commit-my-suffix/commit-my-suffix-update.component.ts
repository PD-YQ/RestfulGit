import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { ICommitMySuffix, CommitMySuffix } from 'app/shared/model/commit-my-suffix.model';
import { CommitMySuffixService } from './commit-my-suffix.service';
import { ITagMySuffix } from 'app/shared/model/tag-my-suffix.model';
import { TagMySuffixService } from 'app/entities/tag-my-suffix/tag-my-suffix.service';
import { IBranchMySuffix } from 'app/shared/model/branch-my-suffix.model';
import { BranchMySuffixService } from 'app/entities/branch-my-suffix/branch-my-suffix.service';

type SelectableEntity = ITagMySuffix | IBranchMySuffix;

@Component({
  selector: 'jhi-commit-my-suffix-update',
  templateUrl: './commit-my-suffix-update.component.html',
})
export class CommitMySuffixUpdateComponent implements OnInit {
  isSaving = false;
  tags: ITagMySuffix[] = [];
  branches: IBranchMySuffix[] = [];

  editForm = this.fb.group({
    id: [],
    tagId: [],
    branchId: [],
  });

  constructor(
    protected commitService: CommitMySuffixService,
    protected tagService: TagMySuffixService,
    protected branchService: BranchMySuffixService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ commit }) => {
      this.updateForm(commit);

      this.tagService
        .query({ filter: 'commit-is-null' })
        .pipe(
          map((res: HttpResponse<ITagMySuffix[]>) => {
            return res.body || [];
          })
        )
        .subscribe((resBody: ITagMySuffix[]) => {
          if (!commit.tagId) {
            this.tags = resBody;
          } else {
            this.tagService
              .find(commit.tagId)
              .pipe(
                map((subRes: HttpResponse<ITagMySuffix>) => {
                  return subRes.body ? [subRes.body].concat(resBody) : resBody;
                })
              )
              .subscribe((concatRes: ITagMySuffix[]) => (this.tags = concatRes));
          }
        });

      this.branchService.query().subscribe((res: HttpResponse<IBranchMySuffix[]>) => (this.branches = res.body || []));
    });
  }

  updateForm(commit: ICommitMySuffix): void {
    this.editForm.patchValue({
      id: commit.id,
      tagId: commit.tagId,
      branchId: commit.branchId,
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const commit = this.createFromForm();
    if (commit.id !== undefined) {
      this.subscribeToSaveResponse(this.commitService.update(commit));
    } else {
      this.subscribeToSaveResponse(this.commitService.create(commit));
    }
  }

  private createFromForm(): ICommitMySuffix {
    return {
      ...new CommitMySuffix(),
      id: this.editForm.get(['id'])!.value,
      tagId: this.editForm.get(['tagId'])!.value,
      branchId: this.editForm.get(['branchId'])!.value,
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<ICommitMySuffix>>): void {
    result.subscribe(
      () => this.onSaveSuccess(),
      () => this.onSaveError()
    );
  }

  protected onSaveSuccess(): void {
    this.isSaving = false;
    this.previousState();
  }

  protected onSaveError(): void {
    this.isSaving = false;
  }

  trackById(index: number, item: SelectableEntity): any {
    return item.id;
  }
}
