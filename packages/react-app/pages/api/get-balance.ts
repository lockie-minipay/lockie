import type { NextApiRequest, NextApiResponse } from "next";
import connect from "../../constants/connect";
import publicClient from "../../constants/client";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<any>
) {
  const { address } = req.body;

  if (req.method === "POST") {
    console.log(address);

    try {
      const filter = await publicClient.createContractEventFilter({
        //@ts-ignore
        address: connect?.moola?.address,
        abi: connect?.moola.abi,
        eventName: "Deposit",
        args: {
          //@ts-ignore
          onBehalfOf: address,
        },
      });

      const logs = await publicClient.getFilterLogs({ filter });

      console.log(logs);

      res.status(200).json(logs);
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  }
}
