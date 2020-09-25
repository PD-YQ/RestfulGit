import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { of } from 'rxjs';

import { RestfulGitTestModule } from '../../../test.module';
import { RepoMySuffixUpdateComponent } from 'app/entities/repo-my-suffix/repo-my-suffix-update.component';
import { RepoMySuffixService } from 'app/entities/repo-my-suffix/repo-my-suffix.service';
import { RepoMySuffix } from 'app/shared/model/repo-my-suffix.model';

describe('Component Tests', () => {
  describe('RepoMySuffix Management Update Component', () => {
    let comp: RepoMySuffixUpdateComponent;
    let fixture: ComponentFixture<RepoMySuffixUpdateComponent>;
    let service: RepoMySuffixService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [RestfulGitTestModule],
        declarations: [RepoMySuffixUpdateComponent],
        providers: [FormBuilder],
      })
        .overrideTemplate(RepoMySuffixUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(RepoMySuffixUpdateComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(RepoMySuffixService);
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', fakeAsync(() => {
        // GIVEN
        const entity = new RepoMySuffix(123);
        spyOn(service, 'update').and.returnValue(of(new HttpResponse({ body: entity })));
        comp.updateForm(entity);
        // WHEN
        comp.save();
        tick(); // simulate async

        // THEN
        expect(service.update).toHaveBeenCalledWith(entity);
        expect(comp.isSaving).toEqual(false);
      }));

      it('Should call create service on save for new entity', fakeAsync(() => {
        // GIVEN
        const entity = new RepoMySuffix();
        spyOn(service, 'create').and.returnValue(of(new HttpResponse({ body: entity })));
        comp.updateForm(entity);
        // WHEN
        comp.save();
        tick(); // simulate async

        // THEN
        expect(service.create).toHaveBeenCalledWith(entity);
        expect(comp.isSaving).toEqual(false);
      }));
    });
  });
});
