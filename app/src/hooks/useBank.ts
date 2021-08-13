import { useRecoilValue, useSetRecoilState } from "recoil";
import _ from "lodash";

import { bankState, BankNotes } from "./../state/bank.state";
import { combinationSum } from "../util/util";
import useUser from "./useUser";

const getBankNotesByWithdrawAmount = (
  availableNotes: BankNotes,
  withdrawAmount: number
): BankNotes | null => {
  const keys = Object.keys(availableNotes);
  const candidates = keys
    .filter((key) => availableNotes[key] !== 0)
    .map((key) => parseInt(key));

  const rawResult = combinationSum(candidates, withdrawAmount);
  const shuffled = _.shuffle(rawResult);

  for (let i = 0; i < shuffled.length; i++) {
    const notes = shuffled[i];
    if (isValidWithdrawBankNotes(availableNotes, notes)) {
      return notesArrayToBankNotes(notes);
    }
  }
  return null;
};

const isValidWithdrawBankNotes = (
  availableNotes: BankNotes,
  notes: number[]
) => {
  const availables = _.cloneDeep(availableNotes);

  for (let i = 0; i < notes.length; i++) {
    const note = notes[i];
    if (availables[note] <= 0) {
      return false;
    }
    availables[note]--;
  }

  return true;
};

const notesArrayToBankNotes = (notes: number[]) => {
  const bankNotes: BankNotes = { 5: 0, 10: 0, 20: 0 };
  notes.forEach((note) => {
    bankNotes[note.toString()]++;
  });
  return bankNotes;
};

export const bankNotesToWithdrawMessage = (bankNotes: BankNotes) => {
  const message = "You withdraw ";
  const details = Object.keys(bankNotes)
    .map((key) => (bankNotes[key] === 0 ? "" : `£${key}x${bankNotes[key]}`))
    .filter((s) => s !== "")
    .join(", ");
  return message + details;
};

export default () => {
  const bank = useRecoilValue(bankState);
  const setBank = useSetRecoilState(bankState);
  
  const { setUser } = useUser();

  const withdraw = (amount: number) => {
    const result = getBankNotesByWithdrawAmount(bank.availableNotes, amount);

    if (result === null) {
        return null
    }

    // subtract to state
    const availableNotes = _.cloneDeep(bank.availableNotes);
    Object.keys(result).forEach(key => {
        availableNotes[key] -= result[key];
    })
    setBank((prev) => ({
        ...prev,
        availableNotes
    }))
    setUser((prev) => ({
        ...prev,
        currentBalance: prev.currentBalance - amount
    }))

    return result;
  };

  return {
    bank,
    withdraw,
  };
};
