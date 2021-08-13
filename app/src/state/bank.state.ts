import { atom } from "recoil";

import { StateKeys } from "./state-keys.const";

export interface BankNotes {
  '5': number;
  '10': number;
  '20': number;

  [key: string]: number;
}
export interface BankState {
  availableNotes: BankNotes;
}

export const bankState = atom<BankState>({
  key: StateKeys.Bank,
  default: {
    availableNotes: {
      '5': 4,
      '10': 15,
      '20': 7,
    },
  },
});
