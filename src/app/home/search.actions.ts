import { createAction, props } from '@ngrx/store'
import { SearchResponse } from "../core/search/search.interface";

export const searchAction = createAction(
  '[Home Component] Search',
  props<{ term: string }>()
);

export const resultsLoadedAction = createAction(
  '[Home Component] Search results loaded',
  props<{ result: SearchResponse }>()
);
