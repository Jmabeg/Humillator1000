import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of, Subject, from } from 'rxjs';

import { MatchFormService } from './match-form.service';
import { MatchService } from '../service/match.service';
import { IMatch } from '../match.model';
import { IClub } from 'app/entities/club/club.model';
import { ClubService } from 'app/entities/club/service/club.service';
import { ISeason } from 'app/entities/season/season.model';
import { SeasonService } from 'app/entities/season/service/season.service';

import { MatchUpdateComponent } from './match-update.component';

describe('Match Management Update Component', () => {
  let comp: MatchUpdateComponent;
  let fixture: ComponentFixture<MatchUpdateComponent>;
  let activatedRoute: ActivatedRoute;
  let matchFormService: MatchFormService;
  let matchService: MatchService;
  let clubService: ClubService;
  let seasonService: SeasonService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule.withRoutes([])],
      declarations: [MatchUpdateComponent],
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
      .overrideTemplate(MatchUpdateComponent, '')
      .compileComponents();

    fixture = TestBed.createComponent(MatchUpdateComponent);
    activatedRoute = TestBed.inject(ActivatedRoute);
    matchFormService = TestBed.inject(MatchFormService);
    matchService = TestBed.inject(MatchService);
    clubService = TestBed.inject(ClubService);
    seasonService = TestBed.inject(SeasonService);

    comp = fixture.componentInstance;
  });

  describe('ngOnInit', () => {
    it('Should call Club query and add missing value', () => {
      const match: IMatch = { id: 456 };
      const club: IClub = { id: 63362 };
      match.club = club;

      const clubCollection: IClub[] = [{ id: 34914 }];
      jest.spyOn(clubService, 'query').mockReturnValue(of(new HttpResponse({ body: clubCollection })));
      const additionalClubs = [club];
      const expectedCollection: IClub[] = [...additionalClubs, ...clubCollection];
      jest.spyOn(clubService, 'addClubToCollectionIfMissing').mockReturnValue(expectedCollection);

      activatedRoute.data = of({ match });
      comp.ngOnInit();

      expect(clubService.query).toHaveBeenCalled();
      expect(clubService.addClubToCollectionIfMissing).toHaveBeenCalledWith(
        clubCollection,
        ...additionalClubs.map(expect.objectContaining)
      );
      expect(comp.clubsSharedCollection).toEqual(expectedCollection);
    });

    it('Should call Season query and add missing value', () => {
      const match: IMatch = { id: 456 };
      const season: ISeason = { id: 50037 };
      match.season = season;

      const seasonCollection: ISeason[] = [{ id: 76176 }];
      jest.spyOn(seasonService, 'query').mockReturnValue(of(new HttpResponse({ body: seasonCollection })));
      const additionalSeasons = [season];
      const expectedCollection: ISeason[] = [...additionalSeasons, ...seasonCollection];
      jest.spyOn(seasonService, 'addSeasonToCollectionIfMissing').mockReturnValue(expectedCollection);

      activatedRoute.data = of({ match });
      comp.ngOnInit();

      expect(seasonService.query).toHaveBeenCalled();
      expect(seasonService.addSeasonToCollectionIfMissing).toHaveBeenCalledWith(
        seasonCollection,
        ...additionalSeasons.map(expect.objectContaining)
      );
      expect(comp.seasonsSharedCollection).toEqual(expectedCollection);
    });

    it('Should update editForm', () => {
      const match: IMatch = { id: 456 };
      const club: IClub = { id: 40978 };
      match.club = club;
      const season: ISeason = { id: 24816 };
      match.season = season;

      activatedRoute.data = of({ match });
      comp.ngOnInit();

      expect(comp.clubsSharedCollection).toContain(club);
      expect(comp.seasonsSharedCollection).toContain(season);
      expect(comp.match).toEqual(match);
    });
  });

  describe('save', () => {
    it('Should call update service on save for existing entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IMatch>>();
      const match = { id: 123 };
      jest.spyOn(matchFormService, 'getMatch').mockReturnValue(match);
      jest.spyOn(matchService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ match });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: match }));
      saveSubject.complete();

      // THEN
      expect(matchFormService.getMatch).toHaveBeenCalled();
      expect(comp.previousState).toHaveBeenCalled();
      expect(matchService.update).toHaveBeenCalledWith(expect.objectContaining(match));
      expect(comp.isSaving).toEqual(false);
    });

    it('Should call create service on save for new entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IMatch>>();
      const match = { id: 123 };
      jest.spyOn(matchFormService, 'getMatch').mockReturnValue({ id: null });
      jest.spyOn(matchService, 'create').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ match: null });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: match }));
      saveSubject.complete();

      // THEN
      expect(matchFormService.getMatch).toHaveBeenCalled();
      expect(matchService.create).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).toHaveBeenCalled();
    });

    it('Should set isSaving to false on error', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IMatch>>();
      const match = { id: 123 };
      jest.spyOn(matchService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ match });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.error('This is an error!');

      // THEN
      expect(matchService.update).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).not.toHaveBeenCalled();
    });
  });

  describe('Compare relationships', () => {
    describe('compareClub', () => {
      it('Should forward to clubService', () => {
        const entity = { id: 123 };
        const entity2 = { id: 456 };
        jest.spyOn(clubService, 'compareClub');
        comp.compareClub(entity, entity2);
        expect(clubService.compareClub).toHaveBeenCalledWith(entity, entity2);
      });
    });

    describe('compareSeason', () => {
      it('Should forward to seasonService', () => {
        const entity = { id: 123 };
        const entity2 = { id: 456 };
        jest.spyOn(seasonService, 'compareSeason');
        comp.compareSeason(entity, entity2);
        expect(seasonService.compareSeason).toHaveBeenCalledWith(entity, entity2);
      });
    });
  });
});
