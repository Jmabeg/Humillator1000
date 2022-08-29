import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of, Subject, from } from 'rxjs';

import { UserHasMatchFormService } from './user-has-match-form.service';
import { UserHasMatchService } from '../service/user-has-match.service';
import { IUserHasMatch } from '../user-has-match.model';
import { IMatch } from 'app/entities/match/match.model';
import { MatchService } from 'app/entities/match/service/match.service';

import { UserHasMatchUpdateComponent } from './user-has-match-update.component';

describe('UserHasMatch Management Update Component', () => {
  let comp: UserHasMatchUpdateComponent;
  let fixture: ComponentFixture<UserHasMatchUpdateComponent>;
  let activatedRoute: ActivatedRoute;
  let userHasMatchFormService: UserHasMatchFormService;
  let userHasMatchService: UserHasMatchService;
  let matchService: MatchService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule.withRoutes([])],
      declarations: [UserHasMatchUpdateComponent],
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
      .overrideTemplate(UserHasMatchUpdateComponent, '')
      .compileComponents();

    fixture = TestBed.createComponent(UserHasMatchUpdateComponent);
    activatedRoute = TestBed.inject(ActivatedRoute);
    userHasMatchFormService = TestBed.inject(UserHasMatchFormService);
    userHasMatchService = TestBed.inject(UserHasMatchService);
    matchService = TestBed.inject(MatchService);

    comp = fixture.componentInstance;
  });

  describe('ngOnInit', () => {
    it('Should call Match query and add missing value', () => {
      const userHasMatch: IUserHasMatch = { id: 456 };
      const match: IMatch = { id: 38490 };
      userHasMatch.match = match;

      const matchCollection: IMatch[] = [{ id: 33078 }];
      jest.spyOn(matchService, 'query').mockReturnValue(of(new HttpResponse({ body: matchCollection })));
      const additionalMatches = [match];
      const expectedCollection: IMatch[] = [...additionalMatches, ...matchCollection];
      jest.spyOn(matchService, 'addMatchToCollectionIfMissing').mockReturnValue(expectedCollection);

      activatedRoute.data = of({ userHasMatch });
      comp.ngOnInit();

      expect(matchService.query).toHaveBeenCalled();
      expect(matchService.addMatchToCollectionIfMissing).toHaveBeenCalledWith(
        matchCollection,
        ...additionalMatches.map(expect.objectContaining)
      );
      expect(comp.matchesSharedCollection).toEqual(expectedCollection);
    });

    it('Should update editForm', () => {
      const userHasMatch: IUserHasMatch = { id: 456 };
      const match: IMatch = { id: 90540 };
      userHasMatch.match = match;

      activatedRoute.data = of({ userHasMatch });
      comp.ngOnInit();

      expect(comp.matchesSharedCollection).toContain(match);
      expect(comp.userHasMatch).toEqual(userHasMatch);
    });
  });

  describe('save', () => {
    it('Should call update service on save for existing entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IUserHasMatch>>();
      const userHasMatch = { id: 123 };
      jest.spyOn(userHasMatchFormService, 'getUserHasMatch').mockReturnValue(userHasMatch);
      jest.spyOn(userHasMatchService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ userHasMatch });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: userHasMatch }));
      saveSubject.complete();

      // THEN
      expect(userHasMatchFormService.getUserHasMatch).toHaveBeenCalled();
      expect(comp.previousState).toHaveBeenCalled();
      expect(userHasMatchService.update).toHaveBeenCalledWith(expect.objectContaining(userHasMatch));
      expect(comp.isSaving).toEqual(false);
    });

    it('Should call create service on save for new entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IUserHasMatch>>();
      const userHasMatch = { id: 123 };
      jest.spyOn(userHasMatchFormService, 'getUserHasMatch').mockReturnValue({ id: null });
      jest.spyOn(userHasMatchService, 'create').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ userHasMatch: null });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: userHasMatch }));
      saveSubject.complete();

      // THEN
      expect(userHasMatchFormService.getUserHasMatch).toHaveBeenCalled();
      expect(userHasMatchService.create).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).toHaveBeenCalled();
    });

    it('Should set isSaving to false on error', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IUserHasMatch>>();
      const userHasMatch = { id: 123 };
      jest.spyOn(userHasMatchService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ userHasMatch });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.error('This is an error!');

      // THEN
      expect(userHasMatchService.update).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).not.toHaveBeenCalled();
    });
  });

  describe('Compare relationships', () => {
    describe('compareMatch', () => {
      it('Should forward to matchService', () => {
        const entity = { id: 123 };
        const entity2 = { id: 456 };
        jest.spyOn(matchService, 'compareMatch');
        comp.compareMatch(entity, entity2);
        expect(matchService.compareMatch).toHaveBeenCalledWith(entity, entity2);
      });
    });
  });
});
