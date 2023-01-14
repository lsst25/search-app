import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
} from "@angular/core";
import { FormControl, FormGroup } from '@angular/forms'
import { BehaviorSubject, Observable } from 'rxjs'
import { SearchHttpService } from '../core/search/search-http.service'
import { SearchResult } from '../core/search/search.interface'
import { select, Store } from "@ngrx/store";
import { searchAction, loadMoreResultsAction } from "./search.actions";
import { AppState } from "../app.state";
import { selectSearchResultsState } from "./search.selectors";
import { animate, style, transition, trigger } from "@angular/animations";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [
    trigger('enterLeave', [
      transition(':enter', [
        style({ opacity: 0, transform: 'scale(0.97)' }),
        animate('250ms ease-out')
      ]),
      transition(':leave', [
        animate(50, style({ opacity: 0 }))
      ])
    ])
  ],
})
export class HomeComponent {
  public totalSearchResults: number = 0
  public searchResults: SearchResult[] = []

  public searchResults$: Observable<SearchResult[]>;

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
    private store: Store<AppState>
  ) {
    this.searchResults$ = store.pipe(select(selectSearchResultsState));
  }

  public onSubmit(): void {
    if (!this.searchForm.get('searchInput')!.value) {
      return
    }
    this.store.dispatch(searchAction({ term: this.term }));
  }

  public loadSearchResults(): void {
    this.store.dispatch(loadMoreResultsAction());
  }

  public trackByFn(index: number, { title }: SearchResult): string {
    return title
  }
}
