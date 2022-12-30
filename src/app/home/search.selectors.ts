import { selectSearchState } from "../app.state";
import { createSelector } from "@ngrx/store";
import { SearchState } from "./search.reduser";


export const selectSearchResultsState = createSelector(
  selectSearchState,
  (state: SearchState) => state.results
);
