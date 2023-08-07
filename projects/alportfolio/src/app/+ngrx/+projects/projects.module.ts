import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { EffectsModule } from "@ngrx/effects";
import { StoreModule } from "@ngrx/store";

import * as projectsReducer from './projects.reducer';
import { ProjectsEffects } from "./projects.effects";


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    StoreModule.forFeature(projectsReducer.projectsFeatureKey, projectsReducer.ProjectsReducer),
    EffectsModule.forFeature([ProjectsEffects]),
  ],
  providers: [],
})
export class ProjectsStoreModule { }
