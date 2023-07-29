import { NgModule } from "@angular/core";
import { EffectsModule } from "@ngrx/effects";
import { StoreModule } from "@ngrx/store";

import { globalReducer } from './global/global.reducer';

@NgModule({
  imports: [
    StoreModule.forRoot({ state: globalReducer }),
    // EffectsModule.forRoot([]),
  ],
  providers: []
})
export class NgRxModule { }
