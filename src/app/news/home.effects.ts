import { Actions, createEffect, ofType } from "@ngrx/effects";
import { Injectable } from "@angular/core";
import { catchError, EMPTY, map, mergeMap } from "rxjs";
import { SearchHttpService } from "../core/search/search-http.service";
import { resultsLoadedAction, searchAction } from "../home/search.actions";

@Injectable()
export class HomeEffects {

  loadSearchResults$ = createEffect(() => this.actions$.pipe(
      ofType(searchAction),
      mergeMap((action) => this.searchService.search(action.term, 0, 10)
        .pipe(
          map(response => resultsLoadedAction({ results: response.organic_results })),
          catchError(() => EMPTY)
        ))
    )
  );

  constructor(
    private actions$: Actions,
    private searchService: SearchHttpService
  ) {}
}
