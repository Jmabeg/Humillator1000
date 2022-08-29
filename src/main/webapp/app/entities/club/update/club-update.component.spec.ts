import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of, Subject, from } from 'rxjs';

import { ClubFormService } from './club-form.service';
import { ClubService } from '../service/club.service';
import { IClub } from '../club.model';

import { ClubUpdateComponent } from './club-update.component';

describe('Club Management Update Component', () => {
  let comp: ClubUpdateComponent;
  let fixture: ComponentFixture<ClubUpdateComponent>;
  let activatedRoute: ActivatedRoute;
  let clubFormService: ClubFormService;
  let clubService: ClubService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule.withRoutes([])],
      declarations: [ClubUpdateComponent],
      providers: [
        FormBuilder,
        {
          provide: ActivatedRoute,
          useValue: {
            params: from([{}]),
          },
        },
      ],
    })
      .overrideTemplate(ClubUpdateComponent, '')
      .compileComponents();

    fixture = TestBed.createComponent(ClubUpdateComponent);
    activatedRoute = TestBed.inject(ActivatedRoute);
    clubFormService = TestBed.inject(ClubFormService);
    clubService = TestBed.inject(ClubService);

    comp = fixture.componentInstance;
  });

  describe('ngOnInit', () => {
    it('Should update editForm', () => {
      const club: IClub = { id: 456 };

      activatedRoute.data = of({ club });
      comp.ngOnInit();

      expect(comp.club).toEqual(club);
    });
  });

  describe('save', () => {
    it('Should call update service on save for existing entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IClub>>();
      const club = { id: 123 };
      jest.spyOn(clubFormService, 'getClub').mockReturnValue(club);
      jest.spyOn(clubService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ club });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: club }));
      saveSubject.complete();

      // THEN
      expect(clubFormService.getClub).toHaveBeenCalled();
      expect(comp.previousState).toHaveBeenCalled();
      expect(clubService.update).toHaveBeenCalledWith(expect.objectContaining(club));
      expect(comp.isSaving).toEqual(false);
    });

    it('Should call create service on save for new entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IClub>>();
      const club = { id: 123 };
      jest.spyOn(clubFormService, 'getClub').mockReturnValue({ id: null });
      jest.spyOn(clubService, 'create').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ club: null });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: club }));
      saveSubject.complete();

      // THEN
      expect(clubFormService.getClub).toHaveBeenCalled();
      expect(clubService.create).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).toHaveBeenCalled();
    });

    it('Should set isSaving to false on error', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IClub>>();
      const club = { id: 123 };
      jest.spyOn(clubService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ club });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.error('This is an error!');

      // THEN
      expect(clubService.update).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).not.toHaveBeenCalled();
    });
  });
});
