import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { catchError, map, of } from "rxjs";


@Injectable()
export class GlobalEffects {

  constructor(private actions$: Actions) { }

}
