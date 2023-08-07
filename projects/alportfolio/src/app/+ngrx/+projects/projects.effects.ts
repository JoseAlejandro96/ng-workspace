import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";

import * as ProjectsActions from './projects.actions';
import { of, switchMap } from "rxjs";

@Injectable()
export class ProjectsEffects {
  constructor(private actions$: Actions) { }

  login$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(ProjectsActions.loadPorjects),
      switchMap((action) => {
        console.log('HOLA:', action);
        return of(ProjectsActions.setProjects({ projects: ['1', '2', '3'] }));
      })
    );
  });
}
