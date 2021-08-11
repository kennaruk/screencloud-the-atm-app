import _, { isInteger } from "lodash";
import { createRef } from "react";
import { useState } from "react";

const PinCode: React.FC = () => {
  const pinLength: number = 4;
  const [pinValues, setpinValues] = useState<string[]>(
    new Array(pinLength).fill("")
  );
  const [elRefs] = useState<React.RefObject<HTMLInputElement>[]>(
    _.range(pinLength).map((_) => createRef())
  );

  const resetValue = (i: number) => {
    const newPinValues = pinValues.slice();

    for (; i < pinLength; i++) {
      newPinValues[i] = "";
    }

    setpinValues(newPinValues);
  };

  const onKeyUp = (i: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    const newPinValues = pinValues.slice();
    if (isInteger(+e.key)) {
      newPinValues[i] = e.key;
      stepForward(i);
    } else if (e.key === "Backspace") {
      console.log("[debug] Backspace");
      newPinValues[i] = "";
      stepBack(i);
    }
    setpinValues(newPinValues);
  };

  const stepForward = (i: number) => {
    if (i + 1 > pinLength - 1) {
      return;
    }
    elRefs[i + 1].current?.focus();

    checkPin();
  };

  const stepBack = (i: number) => {
    if (i - 1 < 0) {
      return;
    }
    elRefs[i - 1].current?.focus();
  };

  const checkPin = () => {
    // let code = ''
    // for (i = 0; i < this.pinlength; i++) {
    //     code = code + document.getElementById(`codefield_${i}`).value
    // }
    // if (code.length == this.pinlength) {
    //     this.validatePin(code)
    // }
  };
  const validatePin = (code: string) => {
    // Check pin on server
    if (code == "1234") alert("success");
  };

  return (
    <div className="flex">
      <div className="bg-white rounded-lg shadow p-4">
        <div className="px-2 pb-4 text-lg">Enter your pin code</div>
        <div className="flex">
          {_.range(pinLength).map((i) => (
            <input
              ref={elRefs[i]}
              autoFocus={i == 0}
              key={`codefield_${i}`}
              className="h-16 w-12 border mx-2 rounded-lg flex items-center text-center font-thin text-3xl"
              value={pinValues[i]}
              maxLength={1}
              max="9"
              min="0"
              inputMode="decimal"
              onKeyUp={(e) => onKeyUp(i, e)}
              onFocus={() => resetValue(i)}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

const LoginPage: React.FC = () => {
  return (
    <div
      className="fixed w-full h-full inset-0 flex flex-col items-center justify-center"
      style={{
        backgroundImage: `url("https://wallpapercave.com/wp/wp7777992.jpg")`,
      }}
    >
      <div className="flex">
        <span className="font-bold text-3xl">SC-ATM</span>
        <img
          className="h-11 ml-2"
          src="data:image/png;base64,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"
        />
      </div>
      <p className="py-4">Welcome back! A,</p>
      <PinCode />;
    </div>
  );
};

export default LoginPage;
