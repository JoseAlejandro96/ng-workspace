

import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { isDarkModeSelector } from './global.selector';
import { GlobalState } from '../../interfaces/global/global-state.interface';
import { toggleDarkMode } from './global.actions';

@Injectable()
export class GlobalFacade {

  /**
   * Si la web esta en darkmode
   */
  isDarkMode$ = this.store.select(isDarkModeSelector);

  constructor(private store: Store<GlobalState>) { }

  toggleDarkMode() {
    this.store.dispatch(toggleDarkMode());
  }
}
