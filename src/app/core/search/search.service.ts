import {Injectable, OnDestroy} from '@angular/core';
import {HttpClient, HttpParams} from "@angular/common/http";
import {BehaviorSubject, map, Observable, Subject, Subscription, tap} from "rxjs";
import {NewsResult, NewsSearchResponse, SearchParamsObject, SearchResponse, SearchResult} from "./search.interface";
import {liveSearch} from "../../shared/helpers/operators";

@Injectable({
    providedIn: 'root'
})
export class SearchService implements OnDestroy {
    private subscriptions: Subscription = new Subscription();
    private readonly PAGINATION_STEP = 20;
    private readonly LIVE_SEARCH_DELAY = 1250;

    private searchPaginationOffset = 0;
    private totalSearchResults = 0;

    private isLoadingSubject: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
    public isLoading$: Observable<boolean> = this.isLoadingSubject.asObservable();


    public searchResultsSubject = new BehaviorSubject<SearchResult[]>([]);
    private currentSearchValue = '';
    private searchValueSubject = new Subject<string>();
    private readonly liveSearchSubject = this.searchValueSubject.pipe(
        liveSearch(searchValue => this.getSearchResults(searchValue, this.searchPaginationOffset), this.LIVE_SEARCH_DELAY),
    );

    public latestNewsSubject = new BehaviorSubject<NewsResult[]>([]);
    private totalNewsResults = 0;
    private newsPaginationOffset = 0;

    private get searchResults(): SearchResult[] {
        return this.searchResultsSubject.getValue();
    }

    private get newsResults(): NewsResult[] {
        return this.latestNewsSubject.getValue();
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

        this.subscriptions.add(
            this.liveSearchSubject.subscribe(result => {
                this.searchResultsSubject.next(result);
                this.isLoadingSubject.next(false);
                this.incrementSearchPaginationOffset();
            })
        );
    }

    public initLatestNews(): void {
        this.resetNews();

        this.subscriptions.add(
            this.getLatestNews(this.newsPaginationOffset).subscribe(
                news => {
                    this.latestNewsSubject.next([...news]);
                    this.incrementNewsPaginationOffset();
                }
            )
        );
    }

    public loadLatestNews(): void {
        if (this.newsResults.length >= this.totalNewsResults) {
            return;
        }
        const previousNews = this.newsResults;

        this.subscriptions.add(
            this.getNewsResults('latest', this.newsPaginationOffset).subscribe(
                news => {
                    this.latestNewsSubject.next([...previousNews, ...news]);
                    this.incrementNewsPaginationOffset();
                }
            )
        );
    }


    public loadSearchResults(): void {
        if (this.searchResults.length >= this.totalSearchResults || !this.currentSearchValue) {
            return;
        }
        const previousSearchResults = this.searchResults;

        this.subscriptions.add(
            this.getSearchResults(this.currentSearchValue, this.searchPaginationOffset)
                .subscribe(result => {
                    this.searchResultsSubject.next([...previousSearchResults, ...result])
                    this.incrementSearchPaginationOffset();
                })
        );
    }

    private resetSearch(): void {
        this.searchPaginationOffset = 0;
        this.totalSearchResults = 0;
        this.searchResultsSubject.next([])
    }

    private resetNews(): void {
        this.newsPaginationOffset = 0;
        this.totalNewsResults = 0;
        this.latestNewsSubject.next([]);
    }

    private incrementSearchPaginationOffset(): void {
        this.searchPaginationOffset += this.PAGINATION_STEP;
    }

    private incrementNewsPaginationOffset(): void {
        this.newsPaginationOffset += this.PAGINATION_STEP;
    }

    private getLatestNews(offset: number): Observable<NewsResult[]> {
        return this.getNewsResults('latest', offset);
    }

    private search(searchValue: string, items: number, mode?: 'news'): Observable<SearchResponse|NewsSearchResponse> {
        const paramsObj: SearchParamsObject = {
            q: searchValue,
            start: items,
            num: this.PAGINATION_STEP
        };

        if (mode === 'news') {
            paramsObj.tbm = 'nws';
        }

        const params = new HttpParams({fromObject: paramsObj} as any);
        return this.http.get<SearchResponse>('/search.json', {params});
    }

    private getSearchResults(searchValue: string, items: number): Observable<SearchResult[]> {
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
                tap(response => this.totalNewsResults = response.search_information.total_results),
                map(response => {
                    if (!('news_results' in response)) return [];
                    return response.error ? [] : response.news_results
                }),
            );
    }

    public ngOnDestroy() {
        this.subscriptions.unsubscribe();
    }
}
