export interface ProjectsState {
  username: string | null;
  projects: string[];
  loading?: boolean;
}

export const initialAppState: ProjectsState = {
  username: null,
  projects: [],
};
