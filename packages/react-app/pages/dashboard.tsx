import { useAccount } from "wagmi";
import ActivityBox from "../components/ActivityBox";
import RewardCard from "../components/RewardCard";
import SaveBox from "../components/EarnBox";
import SavingsCard from "../components/EarningsCard";
import { useState } from "react";
import WithdrawBox from "../components/WithdrawBox";
import LockBox from "../components/LockBox";
import EarnBox from "../components/EarnBox";
import LockCard from "../components/LockCard";
import EarningsCard from "../components/EarningsCard";

const Dashboard = () => {
  const { address } = useAccount();
  const [selected, setSelected] = useState("lock");

  return (
    <section className="p-4 lg:p-6 lg:px-16 2xl:px-24 gap-x-9 flex flex-col lg:flex-row justify-between mx-auto">
      {/* <h2 className="font-medium mb-2 lg:hidden overflow-x-scroll">
        Hi {address?.substring(0, 8)},
      </h2> */}

      <div className="mt-1 mb-3 lg:mt-0 lg:w-[25%] lg:px-4">
        <div className="flex items-center justify-between text-center mb-2">
          <div
            onClick={() => setSelected("lock")}
            className={`${
              selected === "lock"
                ? " border-b-yellow font-medium"
                : "text-gray/40 border-transparent"
            } w-full p-2  cursor-pointer border-b-2`}
          >
            Lock
          </div>

          <div
            onClick={() => setSelected("earn")}
            className={`${
              selected === "earn"
                ? " border-b-yellow font-medium"
                : "text-gray/40 border-transparent"
            } w-full p-2 cursor-pointer border-b-2 hover:border-b-yellow/70`}
          >
            Earn 🔥
          </div>
        </div>

        <div className="flex flex-col lg:hidden gap-x-8">
          {selected === "lock" ? (
            <div className="mt-2">
              <h3>Lock your cUSD to avoid impulse spending</h3>
              <LockCard />
            </div>
          ) : (
            <div className="mt-2">
              <h3>Earn interest on your savings</h3>
              <EarningsCard />
            </div>
          )}
        </div>

        {selected === "lock" ? <LockBox /> : <EarnBox />}
      </div>
    </section>
  );
};
export default Dashboard;
