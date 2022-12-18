import { createAction, props } from "@ngrx/store";

export const search = createAction(
  '[News Component] Search',
  props<{ term: string }>()
  );
