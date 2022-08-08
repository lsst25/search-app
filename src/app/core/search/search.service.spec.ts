import {fakeAsync, TestBed, tick} from '@angular/core/testing';

import {SearchService} from './search.service';
import {SearchHttpService} from "./search-http.service";
import {Observable, of} from "rxjs";
import {NEWS_RESPONSE, SEARCH_RESPONSE} from "../../mocks/mock-consts";
import {NewsSearchResponse, SearchResponse} from "./search.interface";

class SearchHttpMock {
    constructor() {}
    search(searchValue: string, items: number, itemsNumber: number, mode?: 'news'): Observable<SearchResponse|NewsSearchResponse> {
        console.log('MOCK CALLED')
        return mode === 'news' ? of(NEWS_RESPONSE) : of(SEARCH_RESPONSE);
    }
}

describe('SearchService', () => {
    let service: SearchService;
    let searchHttpService: SearchHttpService;

    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [
                {
                    provide: SearchHttpService,
                    useClass: SearchHttpMock
                }
            ]
        });
        service = TestBed.inject(SearchService);
        searchHttpService = TestBed.inject(SearchHttpService);
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });

    describe('performLiveSearch', () => {

        it('sets isLoading$ to true', () => {
            let isLoading = false;
            service.isLoading$.subscribe(state => isLoading = state);

            service.performLiveSearch('test');

            expect(isLoading).toBe(true);
        });

        it('should call resetSearch method',() => {
            const spy = spyOn<any>(service, 'resetSearch');

            service.performLiveSearch('test');

            expect(spy).toHaveBeenCalledTimes(1);
        });

        it('should set currentSearchValue to the provided argument value',() => {
            service.performLiveSearch('test-value');

            expect(service['currentSearchValue']).toBe('test-value');
        });
    });

    describe('initLatestNews', () => {
        it('should call resetNews method',() => {
            const spy = spyOn<any>(service, 'resetNews');

            service.initLatestNews();

            expect(spy).toHaveBeenCalledTimes(1);
        });

        it('should call search method on SearchHttpService', () => {
            spyOn(searchHttpService, 'search').and.callThrough();
            service.initLatestNews();

            expect(searchHttpService.search).toHaveBeenCalledTimes(1);
        });

    })
});
