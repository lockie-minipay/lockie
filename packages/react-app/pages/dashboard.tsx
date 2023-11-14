import { useAccount } from "wagmi";
import ActivityBox from "../components/ActivityBox";
import RewardCard from "../components/RewardCard";
import SaveBox from "../components/SaveBox";
import SavingsCard from "../components/SavingsCard";
import { useState } from "react";
import WithdrawBox from "../components/WithdrawBox";

const Dashboard = () => {
  const { address } = useAccount();
  const [selected, setSelected] = useState("save");

  return (
    <section className="p-4 lg:p-6 lg:px-16 2xl:px-24 gap-x-9 flex flex-col lg:flex-row justify-between mx-auto">
      <h2 className="font-medium mb-2 lg:hidden overflow-x-scroll">
        Hi {address?.substring(0, 8)},
      </h2>

      <div className="flex lg:hidden gap-x-8 items-cente">
        <SavingsCard />
      </div>

      <div className="mt-5 lg:mt-0 lg:w-[25%] lg:px-4">
        <div className="flex items-center justify-between text-center mb-2">
          <div
            onClick={() => setSelected("save")}
            className={`${
              selected === "save"
                ? " border-b-yellow font-medium"
                : "text-gray/40 border-transparent"
            } w-full p-2  cursor-pointer border-b-2`}
          >
            Save
          </div>

          <div
            onClick={() => setSelected("withdraw")}
            className={`${
              selected === "withdraw"
                ? " border-b-yellow font-medium"
                : "text-gray/40 border-transparent"
            } w-full p-2 cursor-pointer border-b-2 hover:border-b-yellow/70`}
          >
            Withdraw
          </div>
        </div>

        {selected === "save" ? <SaveBox /> : <WithdrawBox />}
      </div>

      <ActivityBox />
    </section>
  );
};
export default Dashboard;
