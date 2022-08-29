import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { UserHasMatchDetailComponent } from './user-has-match-detail.component';

describe('UserHasMatch Management Detail Component', () => {
  let comp: UserHasMatchDetailComponent;
  let fixture: ComponentFixture<UserHasMatchDetailComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UserHasMatchDetailComponent],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: { data: of({ userHasMatch: { id: 123 } }) },
        },
      ],
    })
      .overrideTemplate(UserHasMatchDetailComponent, '')
      .compileComponents();
    fixture = TestBed.createComponent(UserHasMatchDetailComponent);
    comp = fixture.componentInstance;
  });

  describe('OnInit', () => {
    it('Should load userHasMatch on init', () => {
      // WHEN
      comp.ngOnInit();

      // THEN
      expect(comp.userHasMatch).toEqual(expect.objectContaining({ id: 123 }));
    });
  });
});
