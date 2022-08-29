import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { IUserHasMatch } from '../user-has-match.model';
import { sampleWithRequiredData, sampleWithNewData, sampleWithPartialData, sampleWithFullData } from '../user-has-match.test-samples';

import { UserHasMatchService } from './user-has-match.service';

const requireRestSample: IUserHasMatch = {
  ...sampleWithRequiredData,
};

describe('UserHasMatch Service', () => {
  let service: UserHasMatchService;
  let httpMock: HttpTestingController;
  let expectedResult: IUserHasMatch | IUserHasMatch[] | boolean | null;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    expectedResult = null;
    service = TestBed.inject(UserHasMatchService);
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

    it('should create a UserHasMatch', () => {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const userHasMatch = { ...sampleWithNewData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.create(userHasMatch).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'POST' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should update a UserHasMatch', () => {
      const userHasMatch = { ...sampleWithRequiredData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.update(userHasMatch).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PUT' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should partial update a UserHasMatch', () => {
      const patchObject = { ...sampleWithPartialData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.partialUpdate(patchObject).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PATCH' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should return a list of UserHasMatch', () => {
      const returnedFromService = { ...requireRestSample };

      const expected = { ...sampleWithRequiredData };

      service.query().subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'GET' });
      req.flush([returnedFromService]);
      httpMock.verify();
      expect(expectedResult).toMatchObject([expected]);
    });

    it('should delete a UserHasMatch', () => {
      service.delete(123).subscribe(resp => (expectedResult = resp.ok));

      const req = httpMock.expectOne({ method: 'DELETE' });
      req.flush({ status: 200 });
      expect(expectedResult);
    });

    describe('addUserHasMatchToCollectionIfMissing', () => {
      it('should add a UserHasMatch to an empty array', () => {
        const userHasMatch: IUserHasMatch = sampleWithRequiredData;
        expectedResult = service.addUserHasMatchToCollectionIfMissing([], userHasMatch);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(userHasMatch);
      });

      it('should not add a UserHasMatch to an array that contains it', () => {
        const userHasMatch: IUserHasMatch = sampleWithRequiredData;
        const userHasMatchCollection: IUserHasMatch[] = [
          {
            ...userHasMatch,
          },
          sampleWithPartialData,
        ];
        expectedResult = service.addUserHasMatchToCollectionIfMissing(userHasMatchCollection, userHasMatch);
        expect(expectedResult).toHaveLength(2);
      });

      it("should add a UserHasMatch to an array that doesn't contain it", () => {
        const userHasMatch: IUserHasMatch = sampleWithRequiredData;
        const userHasMatchCollection: IUserHasMatch[] = [sampleWithPartialData];
        expectedResult = service.addUserHasMatchToCollectionIfMissing(userHasMatchCollection, userHasMatch);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(userHasMatch);
      });

      it('should add only unique UserHasMatch to an array', () => {
        const userHasMatchArray: IUserHasMatch[] = [sampleWithRequiredData, sampleWithPartialData, sampleWithFullData];
        const userHasMatchCollection: IUserHasMatch[] = [sampleWithRequiredData];
        expectedResult = service.addUserHasMatchToCollectionIfMissing(userHasMatchCollection, ...userHasMatchArray);
        expect(expectedResult).toHaveLength(3);
      });

      it('should accept varargs', () => {
        const userHasMatch: IUserHasMatch = sampleWithRequiredData;
        const userHasMatch2: IUserHasMatch = sampleWithPartialData;
        expectedResult = service.addUserHasMatchToCollectionIfMissing([], userHasMatch, userHasMatch2);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(userHasMatch);
        expect(expectedResult).toContain(userHasMatch2);
      });

      it('should accept null and undefined values', () => {
        const userHasMatch: IUserHasMatch = sampleWithRequiredData;
        expectedResult = service.addUserHasMatchToCollectionIfMissing([], null, userHasMatch, undefined);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(userHasMatch);
      });

      it('should return initial array if no UserHasMatch is added', () => {
        const userHasMatchCollection: IUserHasMatch[] = [sampleWithRequiredData];
        expectedResult = service.addUserHasMatchToCollectionIfMissing(userHasMatchCollection, undefined, null);
        expect(expectedResult).toEqual(userHasMatchCollection);
      });
    });

    describe('compareUserHasMatch', () => {
      it('Should return true if both entities are null', () => {
        const entity1 = null;
        const entity2 = null;

        const compareResult = service.compareUserHasMatch(entity1, entity2);

        expect(compareResult).toEqual(true);
      });

      it('Should return false if one entity is null', () => {
        const entity1 = { id: 123 };
        const entity2 = null;

        const compareResult1 = service.compareUserHasMatch(entity1, entity2);
        const compareResult2 = service.compareUserHasMatch(entity2, entity1);

        expect(compareResult1).toEqual(false);
        expect(compareResult2).toEqual(false);
      });

      it('Should return false if primaryKey differs', () => {
        const entity1 = { id: 123 };
        const entity2 = { id: 456 };

        const compareResult1 = service.compareUserHasMatch(entity1, entity2);
        const compareResult2 = service.compareUserHasMatch(entity2, entity1);

        expect(compareResult1).toEqual(false);
        expect(compareResult2).toEqual(false);
      });

      it('Should return false if primaryKey matches', () => {
        const entity1 = { id: 123 };
        const entity2 = { id: 123 };

        const compareResult1 = service.compareUserHasMatch(entity1, entity2);
        const compareResult2 = service.compareUserHasMatch(entity2, entity1);

        expect(compareResult1).toEqual(true);
        expect(compareResult2).toEqual(true);
      });
    });
  });

  afterEach(() => {
    httpMock.verify();
  });
});
