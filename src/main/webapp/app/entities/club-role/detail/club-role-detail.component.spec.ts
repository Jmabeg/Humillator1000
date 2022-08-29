import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { ClubRoleDetailComponent } from './club-role-detail.component';

describe('ClubRole Management Detail Component', () => {
  let comp: ClubRoleDetailComponent;
  let fixture: ComponentFixture<ClubRoleDetailComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ClubRoleDetailComponent],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: { data: of({ clubRole: { id: 123 } }) },
        },
      ],
    })
      .overrideTemplate(ClubRoleDetailComponent, '')
      .compileComponents();
    fixture = TestBed.createComponent(ClubRoleDetailComponent);
    comp = fixture.componentInstance;
  });

  describe('OnInit', () => {
    it('Should load clubRole on init', () => {
      // WHEN
      comp.ngOnInit();

      // THEN
      expect(comp.clubRole).toEqual(expect.objectContaining({ id: 123 }));
    });
  });
});
