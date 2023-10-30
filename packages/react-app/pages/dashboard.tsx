import ActivityBox from "../components/ActivityBox";
import RewardCard from "../components/RewardCard";
import SaveBox from "../components/SaveBox";
import SavingsCard from "../components/SavingsCard";

const Dashboard = () => {
  return (
    <section className="p-4 lg:p-6 2xl:px-24 gap-x-9 flex flex-col lg:flex-row justify-between mx-auto">
      <div className="flex lg:hidden gap-x-8 items-cente">
        <SavingsCard />
      </div>

      <SaveBox />

      <ActivityBox />
    </section>
  );
};
export default Dashboard;
