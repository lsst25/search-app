import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from "@angular/common/http";
import {BehaviorSubject, map, Observable, Subject, tap} from "rxjs";
import {BaseResponse, NewsResult, NewsSearchResponse, SearchResponse, SearchResult} from "./search.interface";
import {liveSearch} from "../../shared/helpers/operators";

@Injectable({
    providedIn: 'root'
})
export class SearchService {
    private readonly PAGINATION_STEP = 20;
    private readonly LIVE_SEARCH_DELAY = 2000;

    private searchPaginationOffset = 0;
    private previousSearchResults: SearchResult[] = [];
    private totalSearchResults = 0;


    private isLoadingSubject: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
    public isLoading$: Observable<boolean> = this.isLoadingSubject.asObservable();


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

        this.resetSearch();
        this.isLoadingSubject.next(true);
        this.currentSearchValue = searchValue;

        this.searchValueSubject.next(this.currentSearchValue);
        this.liveSearchSubject.subscribe(result => {
            this.searchResultsSubject.next(result)
            this.isLoadingSubject.next(false)
        });
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
        this.searchResultsSubject.next([])
    }

    private incrementPaginationOffset(): void {
        this.searchPaginationOffset += this.PAGINATION_STEP;
    }

    public getLatestNews(): Observable<NewsResult[]> {
        return this.getNewsResults('latest', 0);
    }

    private search(searchValue: string, items: number, mode?: string): Observable<SearchResponse|NewsSearchResponse> {
        const paramsObj = {q: searchValue, start: items, num: this.PAGINATION_STEP} as any;
        if (mode === 'news') {
            paramsObj.tbm = 'nws';
        }
        const params = new HttpParams({fromObject: paramsObj});
        return this.http.get<SearchResponse>('/search.json', {params})
    }

    private getSearchResults(searchValue: string, items: number, mode?: string): Observable<SearchResult[]> {
        return this.search(searchValue, items)
            .pipe(
                tap(response => this.totalSearchResults = response.search_information.total_results),
                map(response => {
                    if (!('organic_results' in response)) return [];
                    return response.error ? [] : response.organic_results
                }),
            );
    }

    private getNewsResults(searchValue: string, items: number): Observable<NewsResult[]> {
        return this.search(searchValue, items, 'news')
            .pipe(
                tap(response => this.totalSearchResults = response.search_information.total_results),
                map(response => {
                    if (!('news_results' in response)) return [];
                    return response.error ? [] : response.news_results
                }),
            );
    }
}
