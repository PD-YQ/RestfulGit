import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';

import { IRepoMySuffix, RepoMySuffix } from 'app/shared/model/repo-my-suffix.model';
import { RepoMySuffixService } from './repo-my-suffix.service';

@Component({
  selector: 'jhi-repo-my-suffix-update',
  templateUrl: './repo-my-suffix-update.component.html',
})
export class RepoMySuffixUpdateComponent implements OnInit {
  isSaving = false;

  editForm = this.fb.group({
    id: [],
    url: [],
    username: [],
    password: [],
  });

  constructor(protected repoService: RepoMySuffixService, protected activatedRoute: ActivatedRoute, private fb: FormBuilder) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ repo }) => {
      this.updateForm(repo);
    });
  }

  updateForm(repo: IRepoMySuffix): void {
    this.editForm.patchValue({
      id: repo.id,
      url: repo.url,
      username: repo.username,
      password: repo.password,
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const repo = this.createFromForm();
    if (repo.id !== undefined) {
      this.subscribeToSaveResponse(this.repoService.update(repo));
    } else {
      this.subscribeToSaveResponse(this.repoService.create(repo));
    }
  }

  private createFromForm(): IRepoMySuffix {
    return {
      ...new RepoMySuffix(),
      id: this.editForm.get(['id'])!.value,
      url: this.editForm.get(['url'])!.value,
      username: this.editForm.get(['username'])!.value,
      password: this.editForm.get(['password'])!.value,
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IRepoMySuffix>>): void {
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
}
