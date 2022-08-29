import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { UserRouteAccessService } from 'app/core/auth/user-route-access.service';
import { UserHasMatchComponent } from '../list/user-has-match.component';
import { UserHasMatchDetailComponent } from '../detail/user-has-match-detail.component';
import { UserHasMatchUpdateComponent } from '../update/user-has-match-update.component';
import { UserHasMatchRoutingResolveService } from './user-has-match-routing-resolve.service';
import { ASC } from 'app/config/navigation.constants';

const userHasMatchRoute: Routes = [
  {
    path: '',
    component: UserHasMatchComponent,
    data: {
      defaultSort: 'id,' + ASC,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: UserHasMatchDetailComponent,
    resolve: {
      userHasMatch: UserHasMatchRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: UserHasMatchUpdateComponent,
    resolve: {
      userHasMatch: UserHasMatchRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: UserHasMatchUpdateComponent,
    resolve: {
      userHasMatch: UserHasMatchRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
];

@NgModule({
  imports: [RouterModule.forChild(userHasMatchRoute)],
  exports: [RouterModule],
})
export class UserHasMatchRoutingModule {}
