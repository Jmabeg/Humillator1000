import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [
    RouterModule.forChild([
      {
        path: 'club',
        data: { pageTitle: 'Clubs' },
        loadChildren: () => import('./club/club.module').then(m => m.ClubModule),
      },
      {
        path: 'match',
        data: { pageTitle: 'Matches' },
        loadChildren: () => import('./match/match.module').then(m => m.MatchModule),
      },
      {
        path: 'role',
        data: { pageTitle: 'Roles' },
        loadChildren: () => import('./role/role.module').then(m => m.RoleModule),
      },
      {
        path: 'season',
        data: { pageTitle: 'Seasons' },
        loadChildren: () => import('./season/season.module').then(m => m.SeasonModule),
      },
      {
        path: 'notification',
        data: { pageTitle: 'Notifications' },
        loadChildren: () => import('./notification/notification.module').then(m => m.NotificationModule),
      },
      {
        path: 'club-role',
        data: { pageTitle: 'ClubRoles' },
        loadChildren: () => import('./club-role/club-role.module').then(m => m.ClubRoleModule),
      },
      {
        path: 'user-has-match',
        data: { pageTitle: 'UserHasMatches' },
        loadChildren: () => import('./user-has-match/user-has-match.module').then(m => m.UserHasMatchModule),
      },
      {
        path: 'user-has-club',
        data: { pageTitle: 'UserHasClubs' },
        loadChildren: () => import('./user-has-club/user-has-club.module').then(m => m.UserHasClubModule),
      },
      /* jhipster-needle-add-entity-route - JHipster will add entity modules routes here */
    ]),
  ],
})
export class EntityRoutingModule {}
