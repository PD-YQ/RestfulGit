import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { RestfulGitTestModule } from '../../../test.module';
import { CommitMySuffixDetailComponent } from 'app/entities/commit-my-suffix/commit-my-suffix-detail.component';
import { CommitMySuffix } from 'app/shared/model/commit-my-suffix.model';

describe('Component Tests', () => {
  describe('CommitMySuffix Management Detail Component', () => {
    let comp: CommitMySuffixDetailComponent;
    let fixture: ComponentFixture<CommitMySuffixDetailComponent>;
    const route = ({ data: of({ commit: new CommitMySuffix(123) }) } as any) as ActivatedRoute;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [RestfulGitTestModule],
        declarations: [CommitMySuffixDetailComponent],
        providers: [{ provide: ActivatedRoute, useValue: route }],
      })
        .overrideTemplate(CommitMySuffixDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(CommitMySuffixDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should load commit on init', () => {
        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.commit).toEqual(jasmine.objectContaining({ id: 123 }));
      });
    });
  });
});
