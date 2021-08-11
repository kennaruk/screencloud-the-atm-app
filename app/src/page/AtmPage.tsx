import { createRef, useEffect, useState } from "react";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import useUser from "../hooks/useUser";

const WithdrawInput: React.FC = () => {
  const { user } = useUser();

  const [withdrawAmount, setWithdrawAmount] = useState<string>("");
  const [withdrawNote, setWithdrawNote] = useState<string>("");

  useEffect(() => {
    const value = parseFloat(withdrawAmount.split(",").join(""));

    if (value > user.currentBalance) {
      setWithdrawNote(`overdraw £${value - user.currentBalance}`);
    }
  }, [withdrawAmount]);

  const onWithdrawAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const allowOverdrawn = 100;

    const value = parseFloat(e.target.value.split(",").join(""));
    if (isNaN(value)) {
      setWithdrawAmount("");
    } else if (value > user.currentBalance + allowOverdrawn) {
      setWithdrawAmount(
        (user.currentBalance + allowOverdrawn).toLocaleString()
      );
    } else {
      setWithdrawAmount(value.toLocaleString());
    }
  };

  return (
    <div className="w-full my-2">
      <label
        htmlFor="price"
        className="block text-sm font-medium text-gray-700"
      >
        Enter withdraw amount{" "}
        <span className="text-gray-400">
          (Current balance: {user.currentBalance})
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
          value={withdrawAmount}
          className="py-2 focus:ring-indigo-500 focus:border-indigo-500 block w-full pl-7 pr-12 sm:text-sm border-gray-300 rounded-md"
          placeholder="0"
          onChange={onWithdrawAmountChange}
        />
        <div className="absolute inset-y-0 right-0 mr-1 flex items-center">
          <span className="text-red-500 text-xs font-semibold">
            {withdrawNote}
          </span>
        </div>
      </div>
    </div>
  );
};

const LoginPage: React.FC = () => {
  const { user } = useUser();
  const notify = () => toast("Wow so easy!");

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
          onClick={notify}
        >
          Withdraw
        </button>
      </div>
      <ToastContainer />
    </div>
  );
};

export default LoginPage;
