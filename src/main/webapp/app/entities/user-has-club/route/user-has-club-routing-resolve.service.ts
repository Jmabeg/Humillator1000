import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { mergeMap } from 'rxjs/operators';

import { IUserHasClub } from '../user-has-club.model';
import { UserHasClubService } from '../service/user-has-club.service';

@Injectable({ providedIn: 'root' })
export class UserHasClubRoutingResolveService implements Resolve<IUserHasClub | null> {
  constructor(protected service: UserHasClubService, protected router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IUserHasClub | null | never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        mergeMap((userHasClub: HttpResponse<IUserHasClub>) => {
          if (userHasClub.body) {
            return of(userHasClub.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(null);
  }
}
