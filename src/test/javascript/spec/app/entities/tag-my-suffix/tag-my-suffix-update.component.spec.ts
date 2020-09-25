import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { of } from 'rxjs';

import { RestfulGitTestModule } from '../../../test.module';
import { TagMySuffixUpdateComponent } from 'app/entities/tag-my-suffix/tag-my-suffix-update.component';
import { TagMySuffixService } from 'app/entities/tag-my-suffix/tag-my-suffix.service';
import { TagMySuffix } from 'app/shared/model/tag-my-suffix.model';

describe('Component Tests', () => {
  describe('TagMySuffix Management Update Component', () => {
    let comp: TagMySuffixUpdateComponent;
    let fixture: ComponentFixture<TagMySuffixUpdateComponent>;
    let service: TagMySuffixService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [RestfulGitTestModule],
        declarations: [TagMySuffixUpdateComponent],
        providers: [FormBuilder],
      })
        .overrideTemplate(TagMySuffixUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(TagMySuffixUpdateComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(TagMySuffixService);
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', fakeAsync(() => {
        // GIVEN
        const entity = new TagMySuffix(123);
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
        const entity = new TagMySuffix();
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
