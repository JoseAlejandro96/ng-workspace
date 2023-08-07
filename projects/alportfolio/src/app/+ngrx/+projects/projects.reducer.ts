import { Action, createReducer, on } from "@ngrx/store";
import { ProjectsState, initialAppState } from "../../interfaces/projects/projects.interface";
import { clearPorjects, loadPorjects, setProjects } from "./projects.actions";

export const projectsFeatureKey = 'projectsState';

export const reducer = createReducer(
  initialAppState,
  on(loadPorjects, (state) => ({
    ...state,
    loading: true
  })),
  on(setProjects, (state, { projects }) => ({
    ...state,
    projects,
    loading: false
  })),
  on(clearPorjects, (state) => ({
    ...state,
    projects: [],
  }))
);

export function ProjectsReducer(state: ProjectsState | undefined, action: Action): ProjectsState {
  return reducer(state as ProjectsState, action as Action);
}
