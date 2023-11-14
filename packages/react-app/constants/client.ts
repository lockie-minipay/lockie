import { createPublicClient, http, webSocket } from "viem";
import { goerli } from "viem/chains";

export const publicClient = createPublicClient({
  chain: goerli,
  transport: http("https://rpc.ankr.com/eth_goerli"),
});

export default publicClient;
