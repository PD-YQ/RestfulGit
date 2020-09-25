import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { RestfulGitTestModule } from '../../../test.module';
import { RepoMySuffixDetailComponent } from 'app/entities/repo-my-suffix/repo-my-suffix-detail.component';
import { RepoMySuffix } from 'app/shared/model/repo-my-suffix.model';

describe('Component Tests', () => {
  describe('RepoMySuffix Management Detail Component', () => {
    let comp: RepoMySuffixDetailComponent;
    let fixture: ComponentFixture<RepoMySuffixDetailComponent>;
    const route = ({ data: of({ repo: new RepoMySuffix(123) }) } as any) as ActivatedRoute;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [RestfulGitTestModule],
        declarations: [RepoMySuffixDetailComponent],
        providers: [{ provide: ActivatedRoute, useValue: route }],
      })
        .overrideTemplate(RepoMySuffixDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(RepoMySuffixDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should load repo on init', () => {
        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.repo).toEqual(jasmine.objectContaining({ id: 123 }));
      });
    });
  });
});
