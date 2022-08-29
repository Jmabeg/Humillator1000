import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { mergeMap } from 'rxjs/operators';

import { IUserHasMatch } from '../user-has-match.model';
import { UserHasMatchService } from '../service/user-has-match.service';

@Injectable({ providedIn: 'root' })
export class UserHasMatchRoutingResolveService implements Resolve<IUserHasMatch | null> {
  constructor(protected service: UserHasMatchService, protected router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IUserHasMatch | null | never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        mergeMap((userHasMatch: HttpResponse<IUserHasMatch>) => {
          if (userHasMatch.body) {
            return of(userHasMatch.body);
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
