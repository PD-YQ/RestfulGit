import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { of } from 'rxjs';

import { RestfulGitTestModule } from '../../../test.module';
import { CommitMySuffixUpdateComponent } from 'app/entities/commit-my-suffix/commit-my-suffix-update.component';
import { CommitMySuffixService } from 'app/entities/commit-my-suffix/commit-my-suffix.service';
import { CommitMySuffix } from 'app/shared/model/commit-my-suffix.model';

describe('Component Tests', () => {
  describe('CommitMySuffix Management Update Component', () => {
    let comp: CommitMySuffixUpdateComponent;
    let fixture: ComponentFixture<CommitMySuffixUpdateComponent>;
    let service: CommitMySuffixService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [RestfulGitTestModule],
        declarations: [CommitMySuffixUpdateComponent],
        providers: [FormBuilder],
      })
        .overrideTemplate(CommitMySuffixUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(CommitMySuffixUpdateComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(CommitMySuffixService);
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', fakeAsync(() => {
        // GIVEN
        const entity = new CommitMySuffix(123);
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
        const entity = new CommitMySuffix();
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
