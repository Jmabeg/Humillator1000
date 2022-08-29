import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of, Subject, from } from 'rxjs';

import { SeasonFormService } from './season-form.service';
import { SeasonService } from '../service/season.service';
import { ISeason } from '../season.model';

import { SeasonUpdateComponent } from './season-update.component';

describe('Season Management Update Component', () => {
  let comp: SeasonUpdateComponent;
  let fixture: ComponentFixture<SeasonUpdateComponent>;
  let activatedRoute: ActivatedRoute;
  let seasonFormService: SeasonFormService;
  let seasonService: SeasonService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule.withRoutes([])],
      declarations: [SeasonUpdateComponent],
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
      .overrideTemplate(SeasonUpdateComponent, '')
      .compileComponents();

    fixture = TestBed.createComponent(SeasonUpdateComponent);
    activatedRoute = TestBed.inject(ActivatedRoute);
    seasonFormService = TestBed.inject(SeasonFormService);
    seasonService = TestBed.inject(SeasonService);

    comp = fixture.componentInstance;
  });

  describe('ngOnInit', () => {
    it('Should update editForm', () => {
      const season: ISeason = { id: 456 };

      activatedRoute.data = of({ season });
      comp.ngOnInit();

      expect(comp.season).toEqual(season);
    });
  });

  describe('save', () => {
    it('Should call update service on save for existing entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<ISeason>>();
      const season = { id: 123 };
      jest.spyOn(seasonFormService, 'getSeason').mockReturnValue(season);
      jest.spyOn(seasonService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ season });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: season }));
      saveSubject.complete();

      // THEN
      expect(seasonFormService.getSeason).toHaveBeenCalled();
      expect(comp.previousState).toHaveBeenCalled();
      expect(seasonService.update).toHaveBeenCalledWith(expect.objectContaining(season));
      expect(comp.isSaving).toEqual(false);
    });

    it('Should call create service on save for new entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<ISeason>>();
      const season = { id: 123 };
      jest.spyOn(seasonFormService, 'getSeason').mockReturnValue({ id: null });
      jest.spyOn(seasonService, 'create').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ season: null });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: season }));
      saveSubject.complete();

      // THEN
      expect(seasonFormService.getSeason).toHaveBeenCalled();
      expect(seasonService.create).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).toHaveBeenCalled();
    });

    it('Should set isSaving to false on error', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<ISeason>>();
      const season = { id: 123 };
      jest.spyOn(seasonService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ season });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.error('This is an error!');

      // THEN
      expect(seasonService.update).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).not.toHaveBeenCalled();
    });
  });
});
