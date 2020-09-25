import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { of } from 'rxjs';

import { RestfulGitTestModule } from '../../../test.module';
import { BranchMySuffixUpdateComponent } from 'app/entities/branch-my-suffix/branch-my-suffix-update.component';
import { BranchMySuffixService } from 'app/entities/branch-my-suffix/branch-my-suffix.service';
import { BranchMySuffix } from 'app/shared/model/branch-my-suffix.model';

describe('Component Tests', () => {
  describe('BranchMySuffix Management Update Component', () => {
    let comp: BranchMySuffixUpdateComponent;
    let fixture: ComponentFixture<BranchMySuffixUpdateComponent>;
    let service: BranchMySuffixService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [RestfulGitTestModule],
        declarations: [BranchMySuffixUpdateComponent],
        providers: [FormBuilder],
      })
        .overrideTemplate(BranchMySuffixUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(BranchMySuffixUpdateComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(BranchMySuffixService);
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', fakeAsync(() => {
        // GIVEN
        const entity = new BranchMySuffix(123);
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
        const entity = new BranchMySuffix();
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
