import { atom } from "recoil";

import { StateKeys } from "./state-keys.const";

export interface BankState {
  availableNotes: {
    5: number;
    10: number;
    20: number;
  };
}

export const bankState = atom<BankState>({
  key: StateKeys.Bank,
  default: {
    availableNotes: {
      5: 4,
      10: 15,
      20: 7,
    },
  },
});
