import { Action, createReducer, on } from '@ngrx/store'
import { moreResultsLoadedAction, resultsLoadedAction, searchAction } from "./search.actions";
import { SearchResult } from "../core/search/search.interface";

export interface SearchState {
  term: string;
  results: SearchResult[];
  page: number;
  totalSearchResults: number;
}
export const initialState: SearchState = {
  term: '',
  results: [],
  page: 1,
  totalSearchResults: 0,
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
      results,
    }
  }),
  on(moreResultsLoadedAction, (state, { results }) => {
    return {
      ...state,
      results: [...state.results, ...results],
      page: state.page + 1,
    }
  })
)

export function searchReducer(state: SearchState | undefined, action: Action) {
  return _newsReducer(state, action)
}
