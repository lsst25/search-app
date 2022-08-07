import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from "@angular/common/http";
import {BehaviorSubject, map, Observable, Subject, tap} from "rxjs";
import {SearchResponse, SearchResult} from "./search.interface";
import {liveSearch} from "../../shared/helpers/operators";

@Injectable({
    providedIn: 'root'
})
export class SearchService {
    private readonly PAGINATION_STEP = 20;
    private readonly LIVE_SEARCH_DELAY = 500;

    private searchPaginationOffset = 0;
    private previousSearchResults: SearchResult[] = [];
    private totalSearchResults = 0;

    public searchResultsSubject = new BehaviorSubject<SearchResult[]>([]);

    private currentSearchValue = '';
    private searchValueSubject = new Subject<string>();
    public readonly liveSearchSubject = this.searchValueSubject.pipe(
        liveSearch(searchValue => this.getSearchResults(searchValue, this.searchPaginationOffset), this.LIVE_SEARCH_DELAY),
    );

    public get searchResults(): SearchResult[] {
        return this.searchResultsSubject.getValue();
    }


    constructor(private http: HttpClient) {}

    public performLiveSearch(searchValue: string): void {
        if (!searchValue) {
            this.currentSearchValue = '';
            this.searchResultsSubject.next([]);
            return;
        }

        this.currentSearchValue = searchValue;
        this.resetSearch();

        this.searchValueSubject.next(this.currentSearchValue);
        this.liveSearchSubject.subscribe(result => this.searchResultsSubject.next(result));
    }


    public loadResults(): void {
        if (this.searchResults.length >= this.totalSearchResults || !this.currentSearchValue) {
            return;
        }
        this.previousSearchResults = [...this.searchResults];

        this.getSearchResults(this.currentSearchValue, this.searchPaginationOffset)
            .subscribe(result => {
                this.searchResultsSubject.next([...this.previousSearchResults, ...result])
            })
        this.incrementPaginationOffset();
    }

    private resetSearch(): void {
        this.searchPaginationOffset = 0;
        this.previousSearchResults = [];
        this.totalSearchResults = 0;
    }

    private incrementPaginationOffset(): void {
        this.searchPaginationOffset += this.PAGINATION_STEP;
    }

    public getSearchResults(searchValue: string, items: number): Observable<SearchResult[]> {
        const params = new HttpParams({
            fromObject: {q: searchValue, start: items, num: this.PAGINATION_STEP}
        })

        return this.http.get<SearchResponse>('/search.json', {params})
            .pipe(
                tap(response => this.totalSearchResults = response.search_information.total_results),
                map(response => {
                    return response.error ? [] : response.organic_results
                }),
            );
    }
}
