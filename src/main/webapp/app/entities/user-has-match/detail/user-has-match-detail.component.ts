import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IUserHasMatch } from '../user-has-match.model';

@Component({
  selector: 'jhi-user-has-match-detail',
  templateUrl: './user-has-match-detail.component.html',
})
export class UserHasMatchDetailComponent implements OnInit {
  userHasMatch: IUserHasMatch | null = null;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ userHasMatch }) => {
      this.userHasMatch = userHasMatch;
    });
  }

  previousState(): void {
    window.history.back();
  }
}
