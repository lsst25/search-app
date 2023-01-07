import { selectSearchState } from "../app.state";
import { createSelector } from "@ngrx/store";
import { SearchState } from "./search.reduser";

const PAGINATION_STEP = 25;

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
