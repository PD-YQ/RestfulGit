import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';

import { IBranchMySuffix, BranchMySuffix } from 'app/shared/model/branch-my-suffix.model';
import { BranchMySuffixService } from './branch-my-suffix.service';
import { IRepoMySuffix } from 'app/shared/model/repo-my-suffix.model';
import { RepoMySuffixService } from 'app/entities/repo-my-suffix/repo-my-suffix.service';

@Component({
  selector: 'jhi-branch-my-suffix-update',
  templateUrl: './branch-my-suffix-update.component.html',
})
export class BranchMySuffixUpdateComponent implements OnInit {
  isSaving = false;
  repos: IRepoMySuffix[] = [];

  editForm = this.fb.group({
    id: [],
    name: [],
    status: [],
    repoId: [],
  });

  constructor(
    protected branchService: BranchMySuffixService,
    protected repoService: RepoMySuffixService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ branch }) => {
      this.updateForm(branch);

      this.repoService.query().subscribe((res: HttpResponse<IRepoMySuffix[]>) => (this.repos = res.body || []));
    });
  }

  updateForm(branch: IBranchMySuffix): void {
    this.editForm.patchValue({
      id: branch.id,
      name: branch.name,
      status: branch.status,
      repoId: branch.repoId,
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const branch = this.createFromForm();
    if (branch.id !== undefined) {
      this.subscribeToSaveResponse(this.branchService.update(branch));
    } else {
      this.subscribeToSaveResponse(this.branchService.create(branch));
    }
  }

  private createFromForm(): IBranchMySuffix {
    return {
      ...new BranchMySuffix(),
      id: this.editForm.get(['id'])!.value,
      name: this.editForm.get(['name'])!.value,
      status: this.editForm.get(['status'])!.value,
      repoId: this.editForm.get(['repoId'])!.value,
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IBranchMySuffix>>): void {
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

  trackById(index: number, item: IRepoMySuffix): any {
    return item.id;
  }
}
