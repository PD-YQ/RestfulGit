import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { RestfulGitTestModule } from '../../../test.module';
import { BranchMySuffixDetailComponent } from 'app/entities/branch-my-suffix/branch-my-suffix-detail.component';
import { BranchMySuffix } from 'app/shared/model/branch-my-suffix.model';

describe('Component Tests', () => {
  describe('BranchMySuffix Management Detail Component', () => {
    let comp: BranchMySuffixDetailComponent;
    let fixture: ComponentFixture<BranchMySuffixDetailComponent>;
    const route = ({ data: of({ branch: new BranchMySuffix(123) }) } as any) as ActivatedRoute;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [RestfulGitTestModule],
        declarations: [BranchMySuffixDetailComponent],
        providers: [{ provide: ActivatedRoute, useValue: route }],
      })
        .overrideTemplate(BranchMySuffixDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(BranchMySuffixDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should load branch on init', () => {
        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.branch).toEqual(jasmine.objectContaining({ id: 123 }));
      });
    });
  });
});
