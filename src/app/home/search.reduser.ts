import { Action, createReducer, on } from '@ngrx/store'
import { resultsLoadedAction, searchAction } from "./search.actions";
import { SearchResult } from "../core/search/search.interface";

export interface SearchState {
  term: string;
  results: SearchResult[];
}
export const initialState: SearchState = {
  term: '',
  results: [],
}

const _newsReducer = createReducer(
  initialState,
  on(searchAction, (state, { term }) => {
    return {
      ...state,
      term,
    }
  }),
  on(resultsLoadedAction, (state, { results }) => {
    return {
      ...state,
      results
    }
  })
)

export function searchReducer(state: SearchState | undefined, action: Action) {
  return _newsReducer(state, action)
}
