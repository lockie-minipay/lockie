import { createPublicClient, http } from "viem";
import { goerli } from "viem/chains";

export const publicClient = createPublicClient({
  chain: goerli,
  transport: http(
    "https://eth-goerli.g.alchemy.com/v2/r5z3OottW1RnByVeDPslGoLP-0_uS-vw"
  ),
});

export default publicClient;
