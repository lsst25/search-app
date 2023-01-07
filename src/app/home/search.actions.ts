import { createAction, props } from '@ngrx/store'
import { SearchResult } from "../core/search/search.interface";

export const searchAction = createAction(
  '[Home Component] Search',
  props<{ term: string }>()
);

export const loadMoreResultsAction = createAction(
  '[Home Component] Load more results',
);

export const moreResultsLoadedAction = createAction(
  '[Home Component] More results loaded',
  props<{ results: SearchResult[] }>()
)

export const resultsLoadedAction = createAction(
  '[Home Component] Search results loaded',
  props<{ results: SearchResult[] }>()
);
