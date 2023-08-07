import { createAction, props } from '@ngrx/store';

export const loadPorjects = createAction(
  '[alportfolio projects] loadPorjects'
);

export const setProjects = createAction(
  '[alportfolio projects] setPorjects',
  props<{ projects: string[] }>()
);

export const clearPorjects = createAction(
  '[alportfolio projects] clearPorjects'
);
