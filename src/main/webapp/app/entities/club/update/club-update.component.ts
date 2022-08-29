import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';

import { ClubFormService, ClubFormGroup } from './club-form.service';
import { IClub } from '../club.model';
import { ClubService } from '../service/club.service';

@Component({
  selector: 'jhi-club-update',
  templateUrl: './club-update.component.html',
})
export class ClubUpdateComponent implements OnInit {
  isSaving = false;
  club: IClub | null = null;

  editForm: ClubFormGroup = this.clubFormService.createClubFormGroup();

  constructor(protected clubService: ClubService, protected clubFormService: ClubFormService, protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ club }) => {
      this.club = club;
      if (club) {
        this.updateForm(club);
      }
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const club = this.clubFormService.getClub(this.editForm);
    if (club.id !== null) {
      this.subscribeToSaveResponse(this.clubService.update(club));
    } else {
      this.subscribeToSaveResponse(this.clubService.create(club));
    }
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IClub>>): void {
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

  protected updateForm(club: IClub): void {
    this.club = club;
    this.clubFormService.resetForm(this.editForm, club);
  }
}
