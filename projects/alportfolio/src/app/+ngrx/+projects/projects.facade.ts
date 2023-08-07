import { Injectable } from "@angular/core";
import { Store } from "@ngrx/store";


@Injectable()
export class ProjectsFacade {
  constructor(private readonly store: Store) { }
}
