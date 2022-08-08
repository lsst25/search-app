import {ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {NewsResult} from "../core/search/search.interface";
import {BehaviorSubject, finalize, map, Observable, tap} from "rxjs";
import {SearchHttpService} from "../core/search/search-http.service";

@Component({
    selector: 'app-news',
    templateUrl: './news.component.html',
    styleUrls: ['./news.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class NewsComponent implements OnInit {
    private readonly PAGINATION_STEP: number = 20;

    public newsResults: NewsResult[] = [];

    private totalNewsResults = 0;
    private paginationOffset = 0;

    private isLoadingSubject: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
    private isLoadingPaginationSubject: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

    public isLoading$: Observable<boolean> = this.isLoadingSubject.asObservable();
    public isLoadingPagination$: Observable<boolean> = this.isLoadingPaginationSubject.asObservable();

    constructor(private searchHttp: SearchHttpService,
                private cd: ChangeDetectorRef
    ) {}

    public ngOnInit(): void {
        this.initLatestNews();
    }

    public initLatestNews(): void {
        this.resetNews();
        this.isLoadingSubject.next(true);

        this.getLatestNews(this.paginationOffset).pipe(
            finalize(() => this.isLoadingSubject.next(false))
        )
            .subscribe({
                next: (news) => {
                    this.incrementPaginationOffset();
                    this.newsResults = [...news];
                    this.cd.markForCheck();
                }
            })
    }

    private getLatestNews(offset: number): Observable<NewsResult[]> {
        return this.getNewsResults('latest', offset);
    }

    public loadLatestNews(): void {
        if (this.newsResults.length >= this.totalNewsResults) {
            return;
        }

        this.isLoadingPaginationSubject.next(true);

        const previousNews = [...this.newsResults];

        this.getNewsResults('latest', this.paginationOffset).pipe(
            finalize(() => this.isLoadingPaginationSubject.next(false))
        )
            .subscribe({
                next: (news) => {
                    this.newsResults = [...previousNews, ...news];
                    this.cd.markForCheck();
                },
                error: () => {
                    this.newsResults = [...previousNews];
                    this.canselPaginationOffset();
                    this.cd.markForCheck();
                }
            });
        this.incrementPaginationOffset();
    }

    private getNewsResults(searchValue: string, items: number): Observable<NewsResult[]> {
        return this.searchHttp.search(searchValue, items, this.PAGINATION_STEP, 'news')
            .pipe(
                tap(response => this.totalNewsResults = response.search_information.total_results),
                map(response => {
                    if (!('news_results' in response)) return [];
                    return response.error ? [] : response.news_results
                }),
            );
    }

    private incrementPaginationOffset(): void {
        this.paginationOffset += this.PAGINATION_STEP;
    }

    private canselPaginationOffset(): void {
        this.paginationOffset -= this.PAGINATION_STEP;
    }

    private resetNews(): void {
        this.paginationOffset = 0;
        this.totalNewsResults = 0;
    }

    public trackByFn(index: number, {title}: NewsResult): string {
        return title;
    }
}
