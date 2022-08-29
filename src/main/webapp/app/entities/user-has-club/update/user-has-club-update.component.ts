import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize, map } from 'rxjs/operators';

import { UserHasClubFormService, UserHasClubFormGroup } from './user-has-club-form.service';
import { IUserHasClub } from '../user-has-club.model';
import { UserHasClubService } from '../service/user-has-club.service';
import { IClub } from 'app/entities/club/club.model';
import { ClubService } from 'app/entities/club/service/club.service';
import { IClubRole } from 'app/entities/club-role/club-role.model';
import { ClubRoleService } from 'app/entities/club-role/service/club-role.service';

@Component({
  selector: 'jhi-user-has-club-update',
  templateUrl: './user-has-club-update.component.html',
})
export class UserHasClubUpdateComponent implements OnInit {
  isSaving = false;
  userHasClub: IUserHasClub | null = null;

  clubsSharedCollection: IClub[] = [];
  clubRolesSharedCollection: IClubRole[] = [];

  editForm: UserHasClubFormGroup = this.userHasClubFormService.createUserHasClubFormGroup();

  constructor(
    protected userHasClubService: UserHasClubService,
    protected userHasClubFormService: UserHasClubFormService,
    protected clubService: ClubService,
    protected clubRoleService: ClubRoleService,
    protected activatedRoute: ActivatedRoute
  ) {}

  compareClub = (o1: IClub | null, o2: IClub | null): boolean => this.clubService.compareClub(o1, o2);

  compareClubRole = (o1: IClubRole | null, o2: IClubRole | null): boolean => this.clubRoleService.compareClubRole(o1, o2);

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ userHasClub }) => {
      this.userHasClub = userHasClub;
      if (userHasClub) {
        this.updateForm(userHasClub);
      }

      this.loadRelationshipsOptions();
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const userHasClub = this.userHasClubFormService.getUserHasClub(this.editForm);
    if (userHasClub.id !== null) {
      this.subscribeToSaveResponse(this.userHasClubService.update(userHasClub));
    } else {
      this.subscribeToSaveResponse(this.userHasClubService.create(userHasClub));
    }
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IUserHasClub>>): void {
    result.pipe(finalize(() => this.onSaveFinalize())).subscribe({
      next: () => this.onSaveSuccess(),
      error: () => this.onSaveError(),
    });
  }

  protected onSaveSuccess(): void {
    this.previousState();
  }

  protected onSaveError(): void {
    // Api for inheritance.
  }

  protected onSaveFinalize(): void {
    this.isSaving = false;
  }

  protected updateForm(userHasClub: IUserHasClub): void {
    this.userHasClub = userHasClub;
    this.userHasClubFormService.resetForm(this.editForm, userHasClub);

    this.clubsSharedCollection = this.clubService.addClubToCollectionIfMissing<IClub>(this.clubsSharedCollection, userHasClub.club);
    this.clubRolesSharedCollection = this.clubRoleService.addClubRoleToCollectionIfMissing<IClubRole>(
      this.clubRolesSharedCollection,
      userHasClub.role
    );
  }

  protected loadRelationshipsOptions(): void {
    this.clubService
      .query()
      .pipe(map((res: HttpResponse<IClub[]>) => res.body ?? []))
      .pipe(map((clubs: IClub[]) => this.clubService.addClubToCollectionIfMissing<IClub>(clubs, this.userHasClub?.club)))
      .subscribe((clubs: IClub[]) => (this.clubsSharedCollection = clubs));

    this.clubRoleService
      .query()
      .pipe(map((res: HttpResponse<IClubRole[]>) => res.body ?? []))
      .pipe(
        map((clubRoles: IClubRole[]) => this.clubRoleService.addClubRoleToCollectionIfMissing<IClubRole>(clubRoles, this.userHasClub?.role))
      )
      .subscribe((clubRoles: IClubRole[]) => (this.clubRolesSharedCollection = clubRoles));
  }
}
