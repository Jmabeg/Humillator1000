import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { UserHasClubDetailComponent } from './user-has-club-detail.component';

describe('UserHasClub Management Detail Component', () => {
  let comp: UserHasClubDetailComponent;
  let fixture: ComponentFixture<UserHasClubDetailComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UserHasClubDetailComponent],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: { data: of({ userHasClub: { id: 123 } }) },
        },
      ],
    })
      .overrideTemplate(UserHasClubDetailComponent, '')
      .compileComponents();
    fixture = TestBed.createComponent(UserHasClubDetailComponent);
    comp = fixture.componentInstance;
  });

  describe('OnInit', () => {
    it('Should load userHasClub on init', () => {
      // WHEN
      comp.ngOnInit();

      // THEN
      expect(comp.userHasClub).toEqual(expect.objectContaining({ id: 123 }));
    });
  });
});
