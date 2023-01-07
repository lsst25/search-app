import { selectSearchState } from "../app.state";
import { createSelector } from "@ngrx/store";
import { PAGINATION_STEP, SearchState } from "./search.reduser";


export const selectSearchResultsState = createSelector(
  selectSearchState,
  (state: SearchState) => state.results
);

export const selectTermState = createSelector(
  selectSearchState,
    (state: SearchState) => state.term
);

export const currentSearchOffsetState = createSelector(
  selectSearchState,
  (state: SearchState) => {
    return state.page * PAGINATION_STEP;
  }
)
