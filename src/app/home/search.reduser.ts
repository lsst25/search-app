import { Action, createReducer, on } from '@ngrx/store'
import { searchAction } from './search.actions'

export interface SearchState {
  term: string
}
export const initialState = {
  term: '',
}

const _newsReducer = createReducer(
  initialState,
  on(searchAction, (state, { term }) => {
    return {
      ...state,
      term,
    }
  })
)

export function searchReducer(state: SearchState | undefined, action: Action) {
  return _newsReducer(state, action)
}
