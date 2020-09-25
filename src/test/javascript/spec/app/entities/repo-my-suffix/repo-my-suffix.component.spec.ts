import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { RestfulGitTestModule } from '../../../test.module';
import { RepoMySuffixComponent } from 'app/entities/repo-my-suffix/repo-my-suffix.component';
import { RepoMySuffixService } from 'app/entities/repo-my-suffix/repo-my-suffix.service';
import { RepoMySuffix } from 'app/shared/model/repo-my-suffix.model';

describe('Component Tests', () => {
  describe('RepoMySuffix Management Component', () => {
    let comp: RepoMySuffixComponent;
    let fixture: ComponentFixture<RepoMySuffixComponent>;
    let service: RepoMySuffixService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [RestfulGitTestModule],
        declarations: [RepoMySuffixComponent],
      })
        .overrideTemplate(RepoMySuffixComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(RepoMySuffixComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(RepoMySuffixService);
    });

    it('Should call load all on init', () => {
      // GIVEN
      const headers = new HttpHeaders().append('link', 'link;link');
      spyOn(service, 'query').and.returnValue(
        of(
          new HttpResponse({
            body: [new RepoMySuffix(123)],
            headers,
          })
        )
      );

      // WHEN
      comp.ngOnInit();

      // THEN
      expect(service.query).toHaveBeenCalled();
      expect(comp.repos && comp.repos[0]).toEqual(jasmine.objectContaining({ id: 123 }));
    });
  });
});
