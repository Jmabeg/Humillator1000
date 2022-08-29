import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize, map } from 'rxjs/operators';

import { MatchFormService, MatchFormGroup } from './match-form.service';
import { IMatch } from '../match.model';
import { MatchService } from '../service/match.service';
import { IClub } from 'app/entities/club/club.model';
import { ClubService } from 'app/entities/club/service/club.service';
import { ISeason } from 'app/entities/season/season.model';
import { SeasonService } from 'app/entities/season/service/season.service';

@Component({
  selector: 'jhi-match-update',
  templateUrl: './match-update.component.html',
})
export class MatchUpdateComponent implements OnInit {
  isSaving = false;
  match: IMatch | null = null;

  clubsSharedCollection: IClub[] = [];
  seasonsSharedCollection: ISeason[] = [];

  editForm: MatchFormGroup = this.matchFormService.createMatchFormGroup();

  constructor(
    protected matchService: MatchService,
    protected matchFormService: MatchFormService,
    protected clubService: ClubService,
    protected seasonService: SeasonService,
    protected activatedRoute: ActivatedRoute
  ) {}

  compareClub = (o1: IClub | null, o2: IClub | null): boolean => this.clubService.compareClub(o1, o2);

  compareSeason = (o1: ISeason | null, o2: ISeason | null): boolean => this.seasonService.compareSeason(o1, o2);

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ match }) => {
      this.match = match;
      if (match) {
        this.updateForm(match);
      }

      this.loadRelationshipsOptions();
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const match = this.matchFormService.getMatch(this.editForm);
    if (match.id !== null) {
      this.subscribeToSaveResponse(this.matchService.update(match));
    } else {
      this.subscribeToSaveResponse(this.matchService.create(match));
    }
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IMatch>>): void {
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

  protected updateForm(match: IMatch): void {
    this.match = match;
    this.matchFormService.resetForm(this.editForm, match);

    this.clubsSharedCollection = this.clubService.addClubToCollectionIfMissing<IClub>(this.clubsSharedCollection, match.club);
    this.seasonsSharedCollection = this.seasonService.addSeasonToCollectionIfMissing<ISeason>(this.seasonsSharedCollection, match.season);
  }

  protected loadRelationshipsOptions(): void {
    this.clubService
      .query()
      .pipe(map((res: HttpResponse<IClub[]>) => res.body ?? []))
      .pipe(map((clubs: IClub[]) => this.clubService.addClubToCollectionIfMissing<IClub>(clubs, this.match?.club)))
      .subscribe((clubs: IClub[]) => (this.clubsSharedCollection = clubs));

    this.seasonService
      .query()
      .pipe(map((res: HttpResponse<ISeason[]>) => res.body ?? []))
      .pipe(map((seasons: ISeason[]) => this.seasonService.addSeasonToCollectionIfMissing<ISeason>(seasons, this.match?.season)))
      .subscribe((seasons: ISeason[]) => (this.seasonsSharedCollection = seasons));
  }
}
