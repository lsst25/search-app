import { TestBed } from '@angular/core/testing';

import { SearchHttpService } from './search-http.service';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { NEWS_RESPONSE, SEARCH_RESPONSE } from '../../mocks/mock-consts';
import { NewsSearchResponse, SearchResponse } from './search.interface';

describe('SearchHttpService', () => {
  let service: SearchHttpService;
  let controller: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    service = TestBed.inject(SearchHttpService);
    controller = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should be called with appropriate params and return SearchResponse', () => {
    const expectedUrl = '/search.json?q=test&start=0&num=10';
    let actualResult: SearchResponse | undefined;

    service
      .search('test', 0, 10)
      .subscribe((response) => (actualResult = response as SearchResponse));

    const request = controller.expectOne(expectedUrl);

    request.flush(SEARCH_RESPONSE);
    controller.verify();

    expect(actualResult).toEqual(SEARCH_RESPONSE);
  });

  it('should be called with appropriate params and return NewsResponse', () => {
    const expectedUrl = '/search.json?q=test&start=0&num=10&tbm=nws';
    let actualResult: NewsSearchResponse | undefined;

    service
      .searchNews('test', 0, 10)
      .subscribe((response) => (actualResult = response));

    const request = controller.expectOne(expectedUrl);

    request.flush(NEWS_RESPONSE);
    controller.verify();

    expect(actualResult).toEqual(NEWS_RESPONSE);
  });
});
