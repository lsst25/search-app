import { Actions, createEffect, ofType } from "@ngrx/effects";
import { Injectable } from "@angular/core";
import { catchError, EMPTY, map, mergeMap, withLatestFrom } from "rxjs";
import { SearchHttpService } from "../core/search/search-http.service";
import {
  loadMoreResultsAction,
  moreResultsLoadedAction,
  resultsLoadedAction,
  searchAction
} from "../home/search.actions";
import { Store } from "@ngrx/store";
import { AppState } from "../app.state";
import { currentSearchOffsetState, selectTermState } from "../home/search.selectors";
import { PAGINATION_STEP } from "../home/search.reduser";

@Injectable()
export class HomeEffects {

  loadSearchResults$ = createEffect(() => this.actions$.pipe(
      ofType(searchAction),
      mergeMap((action) => this.searchService.search(action.term, 0, 25)
        .pipe(
          map(response => resultsLoadedAction({ results: response.organic_results })),
          catchError(() => EMPTY)
        ))
    )
  );

  loadMoreResults$ = createEffect(() => this.actions$.pipe(
      ofType(loadMoreResultsAction),
      withLatestFrom(this.store.select(selectTermState), this.store.select(currentSearchOffsetState)),
      mergeMap(([_ ,term, offset]) => this.searchService.search(term, offset, PAGINATION_STEP)
        .pipe(
          map(response => moreResultsLoadedAction({ results: response.organic_results })),
          catchError(() => EMPTY)
        ))
    )
  );

  constructor(
    private actions$: Actions,
    private searchService: SearchHttpService,
    private store: Store<AppState>
  ) {}
}
