

import { createReducer, on } from '@ngrx/store';
import { initialState, AppState } from '../../interfaces/global/global-state.interface';
import * as GlobalActions from './global.actions';

export const globalReducer = createReducer(
  initialState,
  // Define aquí la lógica de tu reductor usando la función 'on'
);
