export interface GlobalState {
  nickname: string | null;
  darkMode: boolean;
}

export const initialGlobalState: GlobalState = {
  nickname: null,
  darkMode: false
};
