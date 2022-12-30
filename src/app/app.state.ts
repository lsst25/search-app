import { searchReducer, SearchState } from "./home/search.reduser";
import { ActionReducerMap, createFeatureSelector } from "@ngrx/store";

export const reducers: ActionReducerMap<AppState> = {
  search: searchReducer,
};

export interface AppState {
  search: SearchState;
}

export const selectSearchState = createFeatureSelector<SearchState>(
  'search'
);
