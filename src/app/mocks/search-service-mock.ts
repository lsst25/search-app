import {Injectable} from '@angular/core';
import {Observable, of} from 'rxjs';
import {NEWS_RESPONSE, SEARCH_RESPONSE} from './mock-consts';
import {NewsSearchResponse, SearchResponse} from "../core/search/search.interface";

@Injectable()
export class SearchServiceMock {
    constructor() {}

    search(searchValue: string, items: number, itemsNumber: number): Observable<SearchResponse> {
        return of(SEARCH_RESPONSE);
    }

    searchNews(searchValue: string, items: number, itemsNumber: number): Observable<NewsSearchResponse> {
        return of(NEWS_RESPONSE);
    }
}
