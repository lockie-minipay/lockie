import type { NextApiRequest, NextApiResponse } from "next";
import connect from "../../constants/connect";
import { ethers } from "ethers";
import { BigNumber } from "@ethersproject/bignumber";

const provider = new ethers.JsonRpcProvider(
  `https://eth-goerli.g.alchemy.com/v2/${process.env.ALCHEMY_ETH_GOERLI_KEY}`
);

const moolaContract = new ethers.Contract(
  connect?.moola?.address,
  connect?.moola?.abi,
  provider
);

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<any>
) {
  const { address } = req.body;

  if (req.method === "POST") {
    try {
      const depositFilter = moolaContract.filters.Deposit(
        connect?.cusd?.address,
        null,
        address,
        null,
        null
      );

      const withdrawFilter = moolaContract.filters.Withdraw(
        connect?.cusd?.address,
        null,
        address,
        null
      );

      //get user deposits & withdrawals
      const depositEvents = await moolaContract.queryFilter(depositFilter);
      const withdrawEvents = await moolaContract.queryFilter(withdrawFilter);

      let totalDeposit = BigNumber.from("0");
      let totalWithdrawals = BigNumber.from("0");

      for (let i = 0; i < depositEvents.length; i++) {
        //@ts-ignore
        let indexedAndNonIndexedData = depositEvents[i].args;
        totalDeposit = totalDeposit.add(indexedAndNonIndexedData[3]);
      }

      for (let i = 0; i < withdrawEvents.length; i++) {
        //@ts-ignore
        let indexedAndNonIndexedData = withdrawEvents[i].args;
        totalWithdrawals = totalWithdrawals.add(indexedAndNonIndexedData[3]);
      }

      //subtract total deposit from total withdrawals
      let currentBalance = totalDeposit.sub(totalWithdrawals);

      res.status(200).json({ currentBalance });
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  }
}
