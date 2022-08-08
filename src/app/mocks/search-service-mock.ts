import {Injectable} from '@angular/core';
import {Observable, of} from 'rxjs';
import {SEARCH_RESULTS, NEWS_RESULTS} from './mock-consts';
import {NewsResult, SearchResult} from "../core/search/search.interface";

@Injectable()
export class SearchServiceMock {
    constructor() {
    }

    public isLoading$: Observable<boolean> = of(false)
    public searchResultsSubject: Observable<SearchResult[]> = of(SEARCH_RESULTS);
    public latestNewsSubject: Observable<NewsResult[]> = of(NEWS_RESULTS);

    public performLiveSearch(searchValue: string): void {
    }

    public initLatestNews(): void {
    }

    public loadLatestNews(): void {
    }

    public loadSearchResults(): void {
    }
}
