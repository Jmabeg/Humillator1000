import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';

import { ClubRoleFormService, ClubRoleFormGroup } from './club-role-form.service';
import { IClubRole } from '../club-role.model';
import { ClubRoleService } from '../service/club-role.service';

@Component({
  selector: 'jhi-club-role-update',
  templateUrl: './club-role-update.component.html',
})
export class ClubRoleUpdateComponent implements OnInit {
  isSaving = false;
  clubRole: IClubRole | null = null;

  editForm: ClubRoleFormGroup = this.clubRoleFormService.createClubRoleFormGroup();

  constructor(
    protected clubRoleService: ClubRoleService,
    protected clubRoleFormService: ClubRoleFormService,
    protected activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ clubRole }) => {
      this.clubRole = clubRole;
      if (clubRole) {
        this.updateForm(clubRole);
      }
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const clubRole = this.clubRoleFormService.getClubRole(this.editForm);
    if (clubRole.id !== null) {
      this.subscribeToSaveResponse(this.clubRoleService.update(clubRole));
    } else {
      this.subscribeToSaveResponse(this.clubRoleService.create(clubRole));
    }
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IClubRole>>): void {
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

  protected updateForm(clubRole: IClubRole): void {
    this.clubRole = clubRole;
    this.clubRoleFormService.resetForm(this.editForm, clubRole);
  }
}
