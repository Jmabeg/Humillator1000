import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of, Subject, from } from 'rxjs';

import { UserHasClubFormService } from './user-has-club-form.service';
import { UserHasClubService } from '../service/user-has-club.service';
import { IUserHasClub } from '../user-has-club.model';
import { IClub } from 'app/entities/club/club.model';
import { ClubService } from 'app/entities/club/service/club.service';
import { IClubRole } from 'app/entities/club-role/club-role.model';
import { ClubRoleService } from 'app/entities/club-role/service/club-role.service';

import { UserHasClubUpdateComponent } from './user-has-club-update.component';

describe('UserHasClub Management Update Component', () => {
  let comp: UserHasClubUpdateComponent;
  let fixture: ComponentFixture<UserHasClubUpdateComponent>;
  let activatedRoute: ActivatedRoute;
  let userHasClubFormService: UserHasClubFormService;
  let userHasClubService: UserHasClubService;
  let clubService: ClubService;
  let clubRoleService: ClubRoleService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule.withRoutes([])],
      declarations: [UserHasClubUpdateComponent],
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
      .overrideTemplate(UserHasClubUpdateComponent, '')
      .compileComponents();

    fixture = TestBed.createComponent(UserHasClubUpdateComponent);
    activatedRoute = TestBed.inject(ActivatedRoute);
    userHasClubFormService = TestBed.inject(UserHasClubFormService);
    userHasClubService = TestBed.inject(UserHasClubService);
    clubService = TestBed.inject(ClubService);
    clubRoleService = TestBed.inject(ClubRoleService);

    comp = fixture.componentInstance;
  });

  describe('ngOnInit', () => {
    it('Should call Club query and add missing value', () => {
      const userHasClub: IUserHasClub = { id: 456 };
      const club: IClub = { id: 34776 };
      userHasClub.club = club;

      const clubCollection: IClub[] = [{ id: 3592 }];
      jest.spyOn(clubService, 'query').mockReturnValue(of(new HttpResponse({ body: clubCollection })));
      const additionalClubs = [club];
      const expectedCollection: IClub[] = [...additionalClubs, ...clubCollection];
      jest.spyOn(clubService, 'addClubToCollectionIfMissing').mockReturnValue(expectedCollection);

      activatedRoute.data = of({ userHasClub });
      comp.ngOnInit();

      expect(clubService.query).toHaveBeenCalled();
      expect(clubService.addClubToCollectionIfMissing).toHaveBeenCalledWith(
        clubCollection,
        ...additionalClubs.map(expect.objectContaining)
      );
      expect(comp.clubsSharedCollection).toEqual(expectedCollection);
    });

    it('Should call ClubRole query and add missing value', () => {
      const userHasClub: IUserHasClub = { id: 456 };
      const role: IClubRole = { id: 64864 };
      userHasClub.role = role;

      const clubRoleCollection: IClubRole[] = [{ id: 60538 }];
      jest.spyOn(clubRoleService, 'query').mockReturnValue(of(new HttpResponse({ body: clubRoleCollection })));
      const additionalClubRoles = [role];
      const expectedCollection: IClubRole[] = [...additionalClubRoles, ...clubRoleCollection];
      jest.spyOn(clubRoleService, 'addClubRoleToCollectionIfMissing').mockReturnValue(expectedCollection);

      activatedRoute.data = of({ userHasClub });
      comp.ngOnInit();

      expect(clubRoleService.query).toHaveBeenCalled();
      expect(clubRoleService.addClubRoleToCollectionIfMissing).toHaveBeenCalledWith(
        clubRoleCollection,
        ...additionalClubRoles.map(expect.objectContaining)
      );
      expect(comp.clubRolesSharedCollection).toEqual(expectedCollection);
    });

    it('Should update editForm', () => {
      const userHasClub: IUserHasClub = { id: 456 };
      const club: IClub = { id: 97660 };
      userHasClub.club = club;
      const role: IClubRole = { id: 71320 };
      userHasClub.role = role;

      activatedRoute.data = of({ userHasClub });
      comp.ngOnInit();

      expect(comp.clubsSharedCollection).toContain(club);
      expect(comp.clubRolesSharedCollection).toContain(role);
      expect(comp.userHasClub).toEqual(userHasClub);
    });
  });

  describe('save', () => {
    it('Should call update service on save for existing entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IUserHasClub>>();
      const userHasClub = { id: 123 };
      jest.spyOn(userHasClubFormService, 'getUserHasClub').mockReturnValue(userHasClub);
      jest.spyOn(userHasClubService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ userHasClub });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: userHasClub }));
      saveSubject.complete();

      // THEN
      expect(userHasClubFormService.getUserHasClub).toHaveBeenCalled();
      expect(comp.previousState).toHaveBeenCalled();
      expect(userHasClubService.update).toHaveBeenCalledWith(expect.objectContaining(userHasClub));
      expect(comp.isSaving).toEqual(false);
    });

    it('Should call create service on save for new entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IUserHasClub>>();
      const userHasClub = { id: 123 };
      jest.spyOn(userHasClubFormService, 'getUserHasClub').mockReturnValue({ id: null });
      jest.spyOn(userHasClubService, 'create').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ userHasClub: null });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: userHasClub }));
      saveSubject.complete();

      // THEN
      expect(userHasClubFormService.getUserHasClub).toHaveBeenCalled();
      expect(userHasClubService.create).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).toHaveBeenCalled();
    });

    it('Should set isSaving to false on error', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IUserHasClub>>();
      const userHasClub = { id: 123 };
      jest.spyOn(userHasClubService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ userHasClub });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.error('This is an error!');

      // THEN
      expect(userHasClubService.update).toHaveBeenCalled();
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

    describe('compareClubRole', () => {
      it('Should forward to clubRoleService', () => {
        const entity = { id: 123 };
        const entity2 = { id: 456 };
        jest.spyOn(clubRoleService, 'compareClubRole');
        comp.compareClubRole(entity, entity2);
        expect(clubRoleService.compareClubRole).toHaveBeenCalledWith(entity, entity2);
      });
    });
  });
});
