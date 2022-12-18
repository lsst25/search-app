import { Action, createReducer, on } from '@ngrx/store'
import { search } from './news.actions'

interface NewsState {
  term: string
}
export const initialState = {
  term: '',
}

const _newsReducer = createReducer(
  initialState,
  on(search, (state, { term }) => {
    return {
      ...state,
      term,
    }
  })
)

export function newsReducer(state: NewsState | undefined, action: Action) {
  return _newsReducer(state, action)
}
