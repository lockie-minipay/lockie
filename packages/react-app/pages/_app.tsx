import { Alfajores, Celo } from "@celo/rainbowkit-celo/chains";
import { goerli } from "wagmi/chains";
import { RainbowKitProvider, getDefaultWallets } from "@rainbow-me/rainbowkit";
import "@rainbow-me/rainbowkit/styles.css";
import type { AppProps } from "next/app";
import { WagmiConfig, configureChains, createConfig } from "wagmi";
import { jsonRpcProvider } from "wagmi/providers/jsonRpc";
import { publicProvider } from "wagmi/providers/public";
import Layout from "../components/Layout";
import "../styles/globals.css";
import { useEffect, useState } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();

const projectId = process.env.NEXT_PUBLIC_WC_PROJECT_ID as string;

const { chains, publicClient } = configureChains(
  [Celo, Alfajores, goerli],
  [
    // jsonRpcProvider({
    //   rpc: (chain) => ({
    //     http: `https://celo-rpc.satoshi.opera-api.com/`,
    //   }),
    // }),
    publicProvider(),
  ]
);

const { connectors } = getDefaultWallets({
  chains,
  projectId,
  appName: "Lockie - One-click access to defi",
});

const appInfo = {
  appName: "Lockie - One-click access to defi",
};

// const wagmiConfig = celoGroups({
//   connectors,
//   publicClient: publicClient,
//   autoConnect: false,
// });

const wagmiConfig = createConfig({
  connectors,
  autoConnect: true,
  publicClient,
});

function App({ Component, pageProps }: AppProps) {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  return (
    <>
      {isLoaded && (
        <QueryClientProvider client={queryClient}>
          <WagmiConfig config={wagmiConfig}>
            <RainbowKitProvider
              chains={chains}
              appInfo={appInfo}
              coolMode={true}
              modalSize="compact"
            >
              <Layout>
                <Component {...pageProps} />
              </Layout>
            </RainbowKitProvider>
          </WagmiConfig>
        </QueryClientProvider>
      )}
    </>
  );
}

export default App;
