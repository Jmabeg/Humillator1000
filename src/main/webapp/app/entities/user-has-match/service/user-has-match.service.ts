import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { isPresent } from 'app/core/util/operators';
import { ApplicationConfigService } from 'app/core/config/application-config.service';
import { createRequestOption } from 'app/core/request/request-util';
import { IUserHasMatch, NewUserHasMatch } from '../user-has-match.model';

export type PartialUpdateUserHasMatch = Partial<IUserHasMatch> & Pick<IUserHasMatch, 'id'>;

export type EntityResponseType = HttpResponse<IUserHasMatch>;
export type EntityArrayResponseType = HttpResponse<IUserHasMatch[]>;

@Injectable({ providedIn: 'root' })
export class UserHasMatchService {
  protected resourceUrl = this.applicationConfigService.getEndpointFor('api/user-has-matches');

  constructor(protected http: HttpClient, protected applicationConfigService: ApplicationConfigService) {}

  create(userHasMatch: NewUserHasMatch): Observable<EntityResponseType> {
    return this.http.post<IUserHasMatch>(this.resourceUrl, userHasMatch, { observe: 'response' });
  }

  update(userHasMatch: IUserHasMatch): Observable<EntityResponseType> {
    return this.http.put<IUserHasMatch>(`${this.resourceUrl}/${this.getUserHasMatchIdentifier(userHasMatch)}`, userHasMatch, {
      observe: 'response',
    });
  }

  partialUpdate(userHasMatch: PartialUpdateUserHasMatch): Observable<EntityResponseType> {
    return this.http.patch<IUserHasMatch>(`${this.resourceUrl}/${this.getUserHasMatchIdentifier(userHasMatch)}`, userHasMatch, {
      observe: 'response',
    });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<IUserHasMatch>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IUserHasMatch[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  getUserHasMatchIdentifier(userHasMatch: Pick<IUserHasMatch, 'id'>): number {
    return userHasMatch.id;
  }

  compareUserHasMatch(o1: Pick<IUserHasMatch, 'id'> | null, o2: Pick<IUserHasMatch, 'id'> | null): boolean {
    return o1 && o2 ? this.getUserHasMatchIdentifier(o1) === this.getUserHasMatchIdentifier(o2) : o1 === o2;
  }

  addUserHasMatchToCollectionIfMissing<Type extends Pick<IUserHasMatch, 'id'>>(
    userHasMatchCollection: Type[],
    ...userHasMatchesToCheck: (Type | null | undefined)[]
  ): Type[] {
    const userHasMatches: Type[] = userHasMatchesToCheck.filter(isPresent);
    if (userHasMatches.length > 0) {
      const userHasMatchCollectionIdentifiers = userHasMatchCollection.map(
        userHasMatchItem => this.getUserHasMatchIdentifier(userHasMatchItem)!
      );
      const userHasMatchesToAdd = userHasMatches.filter(userHasMatchItem => {
        const userHasMatchIdentifier = this.getUserHasMatchIdentifier(userHasMatchItem);
        if (userHasMatchCollectionIdentifiers.includes(userHasMatchIdentifier)) {
          return false;
        }
        userHasMatchCollectionIdentifiers.push(userHasMatchIdentifier);
        return true;
      });
      return [...userHasMatchesToAdd, ...userHasMatchCollection];
    }
    return userHasMatchCollection;
  }
}
