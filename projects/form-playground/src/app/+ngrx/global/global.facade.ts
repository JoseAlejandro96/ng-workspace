

import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from '../../interfaces/global/global-state.interface';
import * as StateActions from './global.actions';

@Injectable()
export class StateFacade {
  constructor(private store: Store<AppState>) {
    // Puedes despachar acciones o inicializar tu Facade aquí si es necesario
  }

  // Implementa aquí tus métodos para interactuar con el Store
}
