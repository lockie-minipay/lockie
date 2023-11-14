import { useAccount, useNetwork, useContractRead } from "wagmi";

import {
  Chart as ChartJs,
  LineElement,
  LineController,
  LinearScale,
  Tooltip,
  Legend,
  CategoryScale,
  PointElement,
} from "chart.js";
import { Line } from "react-chartjs-2";
import connect from "../constants/connect";
import splitData from "../helpers/splitData";

ChartJs.register(
  LineElement,
  LineController,
  LinearScale,
  CategoryScale,
  PointElement,
  Tooltip,
  Legend
);

const SavingsGraph = () => {
  const { address } = useAccount();
  const { chain } = useNetwork();

  const { data: history } = useContractRead({
    //@ts-ignore
    address: connect?.lockie?.address,
    //@ts-ignore
    abi: connect?.lockie?.abi,
    functionName: "getSavings",
    args: [address],
    watch: true,
  });

  const [amounts, dates, rates] = splitData(history);

  const chartData = {
    labels: dates.map((d) => d),
    datasets: [
      {
        label: "Amount",
        data: amounts.map((d) => d),
        fill: false,
        borderColor: "rgb(0, 0, 0)",
        tension: 0.1,
        backgroundColor: "rgb(21 128 61 / 0.9)",
        width: 5,
        borderWidth: 1,
        borderRadius: 15,
      },
      {
        label: "Rates",
        data: rates.map((d) => d),
        fill: false,
        borderColor: "rgb(0, 0, 0)",
        tension: 1,
        backgroundColor: "rgb(233 58 61 / 0.6)",
        width: 5,
        borderWidth: 1,
        borderRadius: 15,
      },
    ],
  };

  return (
    <div className="mt-9 hidden lg:block">
      <h3 className="font-semibold mb-1">Savings Trend</h3>

      {
        //@ts-ignore
        history?.length > 0 ? (
          <div className="w-full">
            <Line data={chartData} />
          </div>
        ) : (
          <div className="text-left">No record found</div>
        )
      }
    </div>
  );
};
export default SavingsGraph;
