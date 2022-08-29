import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { DATE_FORMAT } from 'app/config/input.constants';
import { ISeason } from '../season.model';
import { sampleWithRequiredData, sampleWithNewData, sampleWithPartialData, sampleWithFullData } from '../season.test-samples';

import { SeasonService, RestSeason } from './season.service';

const requireRestSample: RestSeason = {
  ...sampleWithRequiredData,
  startingDate: sampleWithRequiredData.startingDate?.format(DATE_FORMAT),
  endingDate: sampleWithRequiredData.endingDate?.format(DATE_FORMAT),
};

describe('Season Service', () => {
  let service: SeasonService;
  let httpMock: HttpTestingController;
  let expectedResult: ISeason | ISeason[] | boolean | null;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    expectedResult = null;
    service = TestBed.inject(SeasonService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  describe('Service methods', () => {
    it('should find an element', () => {
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.find(123).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'GET' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should create a Season', () => {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const season = { ...sampleWithNewData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.create(season).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'POST' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should update a Season', () => {
      const season = { ...sampleWithRequiredData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.update(season).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PUT' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should partial update a Season', () => {
      const patchObject = { ...sampleWithPartialData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.partialUpdate(patchObject).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PATCH' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should return a list of Season', () => {
      const returnedFromService = { ...requireRestSample };

      const expected = { ...sampleWithRequiredData };

      service.query().subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'GET' });
      req.flush([returnedFromService]);
      httpMock.verify();
      expect(expectedResult).toMatchObject([expected]);
    });

    it('should delete a Season', () => {
      service.delete(123).subscribe(resp => (expectedResult = resp.ok));

      const req = httpMock.expectOne({ method: 'DELETE' });
      req.flush({ status: 200 });
      expect(expectedResult);
    });

    describe('addSeasonToCollectionIfMissing', () => {
      it('should add a Season to an empty array', () => {
        const season: ISeason = sampleWithRequiredData;
        expectedResult = service.addSeasonToCollectionIfMissing([], season);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(season);
      });

      it('should not add a Season to an array that contains it', () => {
        const season: ISeason = sampleWithRequiredData;
        const seasonCollection: ISeason[] = [
          {
            ...season,
          },
          sampleWithPartialData,
        ];
        expectedResult = service.addSeasonToCollectionIfMissing(seasonCollection, season);
        expect(expectedResult).toHaveLength(2);
      });

      it("should add a Season to an array that doesn't contain it", () => {
        const season: ISeason = sampleWithRequiredData;
        const seasonCollection: ISeason[] = [sampleWithPartialData];
        expectedResult = service.addSeasonToCollectionIfMissing(seasonCollection, season);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(season);
      });

      it('should add only unique Season to an array', () => {
        const seasonArray: ISeason[] = [sampleWithRequiredData, sampleWithPartialData, sampleWithFullData];
        const seasonCollection: ISeason[] = [sampleWithRequiredData];
        expectedResult = service.addSeasonToCollectionIfMissing(seasonCollection, ...seasonArray);
        expect(expectedResult).toHaveLength(3);
      });

      it('should accept varargs', () => {
        const season: ISeason = sampleWithRequiredData;
        const season2: ISeason = sampleWithPartialData;
        expectedResult = service.addSeasonToCollectionIfMissing([], season, season2);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(season);
        expect(expectedResult).toContain(season2);
      });

      it('should accept null and undefined values', () => {
        const season: ISeason = sampleWithRequiredData;
        expectedResult = service.addSeasonToCollectionIfMissing([], null, season, undefined);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(season);
      });

      it('should return initial array if no Season is added', () => {
        const seasonCollection: ISeason[] = [sampleWithRequiredData];
        expectedResult = service.addSeasonToCollectionIfMissing(seasonCollection, undefined, null);
        expect(expectedResult).toEqual(seasonCollection);
      });
    });

    describe('compareSeason', () => {
      it('Should return true if both entities are null', () => {
        const entity1 = null;
        const entity2 = null;

        const compareResult = service.compareSeason(entity1, entity2);

        expect(compareResult).toEqual(true);
      });

      it('Should return false if one entity is null', () => {
        const entity1 = { id: 123 };
        const entity2 = null;

        const compareResult1 = service.compareSeason(entity1, entity2);
        const compareResult2 = service.compareSeason(entity2, entity1);

        expect(compareResult1).toEqual(false);
        expect(compareResult2).toEqual(false);
      });

      it('Should return false if primaryKey differs', () => {
        const entity1 = { id: 123 };
        const entity2 = { id: 456 };

        const compareResult1 = service.compareSeason(entity1, entity2);
        const compareResult2 = service.compareSeason(entity2, entity1);

        expect(compareResult1).toEqual(false);
        expect(compareResult2).toEqual(false);
      });

      it('Should return false if primaryKey matches', () => {
        const entity1 = { id: 123 };
        const entity2 = { id: 123 };

        const compareResult1 = service.compareSeason(entity1, entity2);
        const compareResult2 = service.compareSeason(entity2, entity1);

        expect(compareResult1).toEqual(true);
        expect(compareResult2).toEqual(true);
      });
    });
  });

  afterEach(() => {
    httpMock.verify();
  });
});
