import { useState } from "react";
import DepositNaira from "../components/DepositNaira";
import HandleSavings from "../components/HandleSavings";

const SaveBox = () => {
  const [selected, setSelected] = useState("deposit");

  return (
    <aside className="lg:w-[30%] p-4">
      <div className="">
        <div className="flex items-center justify-between text-center mb-2">
          <div
            onClick={() => setSelected("deposit")}
            className={`${
              selected === "deposit"
                ? " border-b-yellow"
                : "text-gray/40 border-transparent"
            } w-full p-2  cursor-pointer border-b-2`}
          >
            Deposit Naira
          </div>
          <div
            onClick={() => setSelected("savings")}
            className={`${
              selected === "savings"
                ? " border-b-yellow"
                : "text-gray/40 border-transparent"
            } w-full text-gray/40 p-2 cursor-pointer border-b-2`}
          >
            Piggy Bank
          </div>
        </div>

        {selected === "deposit" ? <DepositNaira /> : <HandleSavings />}
      </div>
    </aside>
  );
};

export default SaveBox;
