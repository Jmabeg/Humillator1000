import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { UserRouteAccessService } from 'app/core/auth/user-route-access.service';
import { UserHasClubComponent } from '../list/user-has-club.component';
import { UserHasClubDetailComponent } from '../detail/user-has-club-detail.component';
import { UserHasClubUpdateComponent } from '../update/user-has-club-update.component';
import { UserHasClubRoutingResolveService } from './user-has-club-routing-resolve.service';
import { ASC } from 'app/config/navigation.constants';

const userHasClubRoute: Routes = [
  {
    path: '',
    component: UserHasClubComponent,
    data: {
      defaultSort: 'id,' + ASC,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: UserHasClubDetailComponent,
    resolve: {
      userHasClub: UserHasClubRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: UserHasClubUpdateComponent,
    resolve: {
      userHasClub: UserHasClubRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: UserHasClubUpdateComponent,
    resolve: {
      userHasClub: UserHasClubRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
];

@NgModule({
  imports: [RouterModule.forChild(userHasClubRoute)],
  exports: [RouterModule],
})
export class UserHasClubRoutingModule {}
