import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import dayjs from 'dayjs/esm';

import { isPresent } from 'app/core/util/operators';
import { DATE_FORMAT } from 'app/config/input.constants';
import { ApplicationConfigService } from 'app/core/config/application-config.service';
import { createRequestOption } from 'app/core/request/request-util';
import { ISeason, NewSeason } from '../season.model';

export type PartialUpdateSeason = Partial<ISeason> & Pick<ISeason, 'id'>;

type RestOf<T extends ISeason | NewSeason> = Omit<T, 'startingDate' | 'endingDate'> & {
  startingDate?: string | null;
  endingDate?: string | null;
};

export type RestSeason = RestOf<ISeason>;

export type NewRestSeason = RestOf<NewSeason>;

export type PartialUpdateRestSeason = RestOf<PartialUpdateSeason>;

export type EntityResponseType = HttpResponse<ISeason>;
export type EntityArrayResponseType = HttpResponse<ISeason[]>;

@Injectable({ providedIn: 'root' })
export class SeasonService {
  protected resourceUrl = this.applicationConfigService.getEndpointFor('api/seasons');

  constructor(protected http: HttpClient, protected applicationConfigService: ApplicationConfigService) {}

  create(season: NewSeason): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(season);
    return this.http
      .post<RestSeason>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map(res => this.convertResponseFromServer(res)));
  }

  update(season: ISeason): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(season);
    return this.http
      .put<RestSeason>(`${this.resourceUrl}/${this.getSeasonIdentifier(season)}`, copy, { observe: 'response' })
      .pipe(map(res => this.convertResponseFromServer(res)));
  }

  partialUpdate(season: PartialUpdateSeason): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(season);
    return this.http
      .patch<RestSeason>(`${this.resourceUrl}/${this.getSeasonIdentifier(season)}`, copy, { observe: 'response' })
      .pipe(map(res => this.convertResponseFromServer(res)));
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http
      .get<RestSeason>(`${this.resourceUrl}/${id}`, { observe: 'response' })
      .pipe(map(res => this.convertResponseFromServer(res)));
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http
      .get<RestSeason[]>(this.resourceUrl, { params: options, observe: 'response' })
      .pipe(map(res => this.convertResponseArrayFromServer(res)));
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  getSeasonIdentifier(season: Pick<ISeason, 'id'>): number {
    return season.id;
  }

  compareSeason(o1: Pick<ISeason, 'id'> | null, o2: Pick<ISeason, 'id'> | null): boolean {
    return o1 && o2 ? this.getSeasonIdentifier(o1) === this.getSeasonIdentifier(o2) : o1 === o2;
  }

  addSeasonToCollectionIfMissing<Type extends Pick<ISeason, 'id'>>(
    seasonCollection: Type[],
    ...seasonsToCheck: (Type | null | undefined)[]
  ): Type[] {
    const seasons: Type[] = seasonsToCheck.filter(isPresent);
    if (seasons.length > 0) {
      const seasonCollectionIdentifiers = seasonCollection.map(seasonItem => this.getSeasonIdentifier(seasonItem)!);
      const seasonsToAdd = seasons.filter(seasonItem => {
        const seasonIdentifier = this.getSeasonIdentifier(seasonItem);
        if (seasonCollectionIdentifiers.includes(seasonIdentifier)) {
          return false;
        }
        seasonCollectionIdentifiers.push(seasonIdentifier);
        return true;
      });
      return [...seasonsToAdd, ...seasonCollection];
    }
    return seasonCollection;
  }

  protected convertDateFromClient<T extends ISeason | NewSeason | PartialUpdateSeason>(season: T): RestOf<T> {
    return {
      ...season,
      startingDate: season.startingDate?.format(DATE_FORMAT) ?? null,
      endingDate: season.endingDate?.format(DATE_FORMAT) ?? null,
    };
  }

  protected convertDateFromServer(restSeason: RestSeason): ISeason {
    return {
      ...restSeason,
      startingDate: restSeason.startingDate ? dayjs(restSeason.startingDate) : undefined,
      endingDate: restSeason.endingDate ? dayjs(restSeason.endingDate) : undefined,
    };
  }

  protected convertResponseFromServer(res: HttpResponse<RestSeason>): HttpResponse<ISeason> {
    return res.clone({
      body: res.body ? this.convertDateFromServer(res.body) : null,
    });
  }

  protected convertResponseArrayFromServer(res: HttpResponse<RestSeason[]>): HttpResponse<ISeason[]> {
    return res.clone({
      body: res.body ? res.body.map(item => this.convertDateFromServer(item)) : null,
    });
  }
}
