import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IUserHasClub } from '../user-has-club.model';

@Component({
  selector: 'jhi-user-has-club-detail',
  templateUrl: './user-has-club-detail.component.html',
})
export class UserHasClubDetailComponent implements OnInit {
  userHasClub: IUserHasClub | null = null;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ userHasClub }) => {
      this.userHasClub = userHasClub;
    });
  }

  previousState(): void {
    window.history.back();
  }
}
