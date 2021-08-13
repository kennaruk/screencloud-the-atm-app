import { userState } from "./../state/user.state";
import { useRecoilValue, useSetRecoilState } from "recoil";


export default () => {
  const user = useRecoilValue(userState);
  const setUser = useSetRecoilState(userState);

  const getToWithdrawAmount = (): number => {
    const value = parseFloat(user.toWithdrawAmount.split(",").join(""));
    return value;
  }

  const setToWithdrawAmount = (amount: string = "") => {
    const allowOverdrawn = 100;

    const value = parseFloat(amount.split(",").join(""));
    if (isNaN(value)) {
      setUser((prev) => ({
        ...prev,
        toWithdrawAmount: "",
      }));
    } else if (value > user.currentBalance + allowOverdrawn) {
      setUser((prev) => ({
        ...prev,
        toWithdrawAmount: (
          user.currentBalance + allowOverdrawn
        ).toLocaleString(),
      }));
    } else {
      setUser((prev) => ({
        ...prev,
        toWithdrawAmount: value.toLocaleString(),
      }));
    }
  };

  return {
    user,
    setUser,
    setToWithdrawAmount,
    toWithdrawAmount: getToWithdrawAmount(),
  };
};
