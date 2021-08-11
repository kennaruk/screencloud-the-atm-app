import { createRef, useEffect, useState } from "react";

const WithdrawInput: React.FC = () => {
  return (
    <div className="w-full my-2">
      <label
        htmlFor="price"
        className="block text-sm font-medium text-gray-700"
      >
        Enter withdraw amount
      </label>
      <div className="w-full mt-1 relative rounded-md shadow-sm">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <span className="text-gray-500 sm:text-sm">£</span>
        </div>
        <input
          type="text"
          name="price"
          id="price"
          className="py-2 focus:ring-indigo-500 focus:border-indigo-500 block w-full pl-7 pr-12 sm:text-sm border-gray-300 rounded-md"
          placeholder="0.00"
        />
      </div>
    </div>
  );
};

const LoginPage: React.FC = () => {
  return (
    <div
      className="fixed w-full h-full inset-0 flex flex-col items-center justify-center"
      style={{
        backgroundImage: `url("https://tailwindui.com/img/beams-corner-light.jpg")`,
      }}
    >
      <div className="w-1/3">
        <WithdrawInput />
        <button
          type="button"
          className="my-2 w-full border border-gray-700 bg-gray-700 text-white rounded-md px-4 py-2 transition duration-500 ease select-none hover:bg-gray-800 focus:outline-none focus:shadow-outline"
        >
          Withdraw
        </button>
      </div>
    </div>
  );
};

export default LoginPage;
