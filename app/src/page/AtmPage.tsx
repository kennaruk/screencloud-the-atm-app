import { createRef, useEffect, useState } from "react";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import useBank, { bankNotesToWithdrawMessage } from "../hooks/useBank";

import useUser from "../hooks/useUser";

const WithdrawInput: React.FC = () => {
  const { user, setToWithdrawAmount } = useUser();

  const [withdrawNote, setWithdrawNote] = useState<string>("");

  useEffect(() => {
    const value = parseFloat(user.toWithdrawAmount.split(",").join(""));

    if (value > user.currentBalance) {
      setWithdrawNote(`overdraw £${value - user.currentBalance}`);
    } else {
      setWithdrawNote("");
    }
  }, [user.toWithdrawAmount]);

  const onWithdrawAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setToWithdrawAmount(e.target.value);
  };

  return (
    <div className="w-full my-2">
      <label
        htmlFor="price"
        className="block text-sm font-medium text-gray-700"
      >
        Enter withdraw amount{" "}
        <span className="text-gray-400">
          (Current balance: £{user.currentBalance.toLocaleString()})
        </span>
      </label>
      <div className="w-full mt-1 relative rounded-md shadow-sm">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <span className="text-gray-500 sm:text-sm">£</span>
        </div>
        <input
          type="text"
          name="price"
          id="price"
          value={user.toWithdrawAmount}
          className="py-2 focus:ring-indigo-500 focus:border-indigo-500 block w-full pl-7 pr-12 sm:text-sm border-gray-300 rounded-md"
          placeholder="0"
          onChange={onWithdrawAmountChange}
        />
        <div className="absolute inset-y-0 right-0 mr-2 flex items-center">
          <span className="text-red-500 text-xs font-semibold">
            {withdrawNote}
          </span>
        </div>
      </div>
    </div>
  );
};

const LoginPage: React.FC = () => {
  const { toWithdrawAmount, setToWithdrawAmount } = useUser();
  const { withdraw } = useBank();

  const onWithdraw = () => {
    const notes = withdraw(toWithdrawAmount);
    if (notes === null) {
      toast(`Don't have enough notes to withdraw £${toWithdrawAmount.toLocaleString()}`, {
        autoClose: false,
      });

      return;
    }

    toast(bankNotesToWithdrawMessage(notes), { autoClose: false });
    setToWithdrawAmount("");
  };

  return (
    <div
      className="fixed w-full h-full inset-0 flex flex-col items-center justify-center"
      style={{
        backgroundImage: `url("https://tailwindui.com/img/beams-corner-light.jpg")`,
      }}
    >
      <div className="w-1/2">
        <WithdrawInput />
        <button
          type="button"
          className="my-2 w-full border border-gray-700 bg-gray-700 text-white rounded-md px-4 py-2 transition duration-500 ease select-none hover:bg-gray-800 focus:outline-none focus:shadow-outline"
          onClick={onWithdraw}
        >
          Withdraw
        </button>
      </div>
      <ToastContainer />
    </div>
  );
};

export default LoginPage;
