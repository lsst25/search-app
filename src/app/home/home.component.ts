import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
} from '@angular/core'
import { FormControl, FormGroup } from '@angular/forms'
import { BehaviorSubject, finalize, first, map, Observable, tap } from 'rxjs'
import { SearchHttpService } from '../core/search/search-http.service'
import { SearchResult } from '../core/search/search.interface'
import { Store } from "@ngrx/store";
import { SearchState } from "./search.reduser";
import { searchAction } from "./search.actions";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomeComponent {
  private readonly PAGINATION_STEP: number = 20

  private paginationOffset: number = 0
  private currentSearchValue: string = ''
  public totalSearchResults: number = 0
  public searchResults: SearchResult[] = []

  private isLoadingSubject: BehaviorSubject<boolean> =
    new BehaviorSubject<boolean>(false)
  private isLoadingPaginationSubject: BehaviorSubject<boolean> =
    new BehaviorSubject<boolean>(false)

  public isLoading$: Observable<boolean> = this.isLoadingSubject.asObservable()
  public isLoadingPagination$: Observable<boolean> =
    this.isLoadingPaginationSubject.asObservable()

  public searchForm = new FormGroup({
    searchInput: new FormControl(''),
  })

  private get term(): string {
    return this.searchForm.get('searchInput')!.value || ''
  }

  constructor(
    private searchHttp: SearchHttpService,
    private cd: ChangeDetectorRef,
    private store: Store<SearchState>
  ) {}

  public onSubmit(): void {
    if (!this.searchForm.get('searchInput')!.value) {
      return
    }
    this.store.dispatch(searchAction({ term: this.term }));

    this.initSearch(this.term)
  }

  public initSearch(searchValue: string | null): void {
    if (!searchValue) {
      return
    }

    this.resetSearch()
    this.isLoadingSubject.next(true)
    this.currentSearchValue = searchValue

    this.getSearchResults(searchValue, this.paginationOffset)
      .pipe(
        finalize(() => this.isLoadingSubject.next(false)),
        first()
      )
      .subscribe((result) => {
        this.searchResults = [...result]
        this.incrementPaginationOffset()
        this.cd.markForCheck()
      })
  }

  public loadSearchResults(): void {
    if (
      this.searchResults.length >= this.totalSearchResults ||
      !this.currentSearchValue
    ) {
      return
    }

    const previousSearchResults = [...this.searchResults]

    this.isLoadingPaginationSubject.next(true)

    this.getSearchResults(this.currentSearchValue, this.paginationOffset)
      .pipe(
        finalize(() => this.isLoadingPaginationSubject.next(false)),
        first()
      )
      .subscribe({
        next: (result) => {
          this.searchResults = [...previousSearchResults, ...result]
          this.cd.markForCheck()
        },
        error: () => {
          this.searchResults = [...previousSearchResults]
          this.canselPaginationOffset()
          this.cd.markForCheck()
        },
      })
    this.incrementPaginationOffset()
  }

  private resetSearch(): void {
    this.paginationOffset = 0
    this.totalSearchResults = 0
  }

  private incrementPaginationOffset(): void {
    this.paginationOffset += this.PAGINATION_STEP
  }

  private canselPaginationOffset(): void {
    this.paginationOffset -= this.PAGINATION_STEP
  }

  private getSearchResults(
    searchValue: string,
    items: number
  ): Observable<SearchResult[]> {
    return this.searchHttp
      .search(searchValue, items, this.PAGINATION_STEP)
      .pipe(
        tap(
          (response) =>
            (this.totalSearchResults =
              response.search_information.total_results)
        ),
        map((response) => (response.error ? [] : response.organic_results))
      )
  }

  public trackByFn(index: number, { title }: SearchResult): string {
    return title
  }
}
