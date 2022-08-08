import {Injectable} from '@angular/core';
import {Observable, of} from 'rxjs';
import {NEWS_RESPONSE, SEARCH_RESPONSE} from './mock-consts';
import {NewsSearchResponse, SearchResponse} from "../core/search/search.interface";

@Injectable()
export class SearchServiceMock {
    constructor() {}

    search(searchValue: string, items: number, itemsNumber: number, mode?: 'news'): Observable<SearchResponse|NewsSearchResponse> {
        console.log('MOCK CALLED')
        return mode === 'news' ? of(NEWS_RESPONSE) : of(SEARCH_RESPONSE);
    }
}
