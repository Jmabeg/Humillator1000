import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IClubRole } from '../club-role.model';

@Component({
  selector: 'jhi-club-role-detail',
  templateUrl: './club-role-detail.component.html',
})
export class ClubRoleDetailComponent implements OnInit {
  clubRole: IClubRole | null = null;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ clubRole }) => {
      this.clubRole = clubRole;
    });
  }

  previousState(): void {
    window.history.back();
  }
}
