import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of, Subject, from } from 'rxjs';

import { ClubRoleFormService } from './club-role-form.service';
import { ClubRoleService } from '../service/club-role.service';
import { IClubRole } from '../club-role.model';

import { ClubRoleUpdateComponent } from './club-role-update.component';

describe('ClubRole Management Update Component', () => {
  let comp: ClubRoleUpdateComponent;
  let fixture: ComponentFixture<ClubRoleUpdateComponent>;
  let activatedRoute: ActivatedRoute;
  let clubRoleFormService: ClubRoleFormService;
  let clubRoleService: ClubRoleService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule.withRoutes([])],
      declarations: [ClubRoleUpdateComponent],
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
      .overrideTemplate(ClubRoleUpdateComponent, '')
      .compileComponents();

    fixture = TestBed.createComponent(ClubRoleUpdateComponent);
    activatedRoute = TestBed.inject(ActivatedRoute);
    clubRoleFormService = TestBed.inject(ClubRoleFormService);
    clubRoleService = TestBed.inject(ClubRoleService);

    comp = fixture.componentInstance;
  });

  describe('ngOnInit', () => {
    it('Should update editForm', () => {
      const clubRole: IClubRole = { id: 456 };

      activatedRoute.data = of({ clubRole });
      comp.ngOnInit();

      expect(comp.clubRole).toEqual(clubRole);
    });
  });

  describe('save', () => {
    it('Should call update service on save for existing entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IClubRole>>();
      const clubRole = { id: 123 };
      jest.spyOn(clubRoleFormService, 'getClubRole').mockReturnValue(clubRole);
      jest.spyOn(clubRoleService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ clubRole });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: clubRole }));
      saveSubject.complete();

      // THEN
      expect(clubRoleFormService.getClubRole).toHaveBeenCalled();
      expect(comp.previousState).toHaveBeenCalled();
      expect(clubRoleService.update).toHaveBeenCalledWith(expect.objectContaining(clubRole));
      expect(comp.isSaving).toEqual(false);
    });

    it('Should call create service on save for new entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IClubRole>>();
      const clubRole = { id: 123 };
      jest.spyOn(clubRoleFormService, 'getClubRole').mockReturnValue({ id: null });
      jest.spyOn(clubRoleService, 'create').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ clubRole: null });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: clubRole }));
      saveSubject.complete();

      // THEN
      expect(clubRoleFormService.getClubRole).toHaveBeenCalled();
      expect(clubRoleService.create).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).toHaveBeenCalled();
    });

    it('Should set isSaving to false on error', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IClubRole>>();
      const clubRole = { id: 123 };
      jest.spyOn(clubRoleService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ clubRole });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.error('This is an error!');

      // THEN
      expect(clubRoleService.update).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).not.toHaveBeenCalled();
    });
  });
});
