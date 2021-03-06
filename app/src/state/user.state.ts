import { atom } from "recoil";

import { StateKeys } from "./state-keys.const";

export interface UserState {
  currentBalance: number;
  toWithdrawAmount: string;
}

export const userState = atom<UserState>({
  key: StateKeys.User,
  default: {
    currentBalance: 2200,
    toWithdrawAmount: '',
  },
});
