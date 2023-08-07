import { createSelector } from '@ngrx/store';
import { GlobalState } from '../../interfaces/global/global-state.interface';

export const isDarkModeSelector = (state: GlobalState) => state.darkMode;
