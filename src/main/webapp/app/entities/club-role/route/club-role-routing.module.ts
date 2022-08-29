import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { UserRouteAccessService } from 'app/core/auth/user-route-access.service';
import { ClubRoleComponent } from '../list/club-role.component';
import { ClubRoleDetailComponent } from '../detail/club-role-detail.component';
import { ClubRoleUpdateComponent } from '../update/club-role-update.component';
import { ClubRoleRoutingResolveService } from './club-role-routing-resolve.service';
import { ASC } from 'app/config/navigation.constants';

const clubRoleRoute: Routes = [
  {
    path: '',
    component: ClubRoleComponent,
    data: {
      defaultSort: 'id,' + ASC,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: ClubRoleDetailComponent,
    resolve: {
      clubRole: ClubRoleRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: ClubRoleUpdateComponent,
    resolve: {
      clubRole: ClubRoleRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: ClubRoleUpdateComponent,
    resolve: {
      clubRole: ClubRoleRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
];

@NgModule({
  imports: [RouterModule.forChild(clubRoleRoute)],
  exports: [RouterModule],
})
export class ClubRoleRoutingModule {}
