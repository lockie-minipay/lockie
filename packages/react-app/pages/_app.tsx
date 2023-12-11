import { Celo } from "@celo/rainbowkit-celo/chains";
import { RainbowKitProvider } from "@rainbow-me/rainbowkit";
import "@rainbow-me/rainbowkit/styles.css";
import type { AppProps } from "next/app";
import { WagmiConfig, configureChains, createConfig } from "wagmi";
import { jsonRpcProvider } from "wagmi/providers/jsonRpc";
import { publicProvider } from "wagmi/providers/public";
import Layout from "../components/Layout";
import "../styles/globals.css";
import { useEffect, useState } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import celoGroups from "@celo/rainbowkit-celo/lists";

const queryClient = new QueryClient();

const projectId = process.env.NEXT_PUBLIC_WC_PROJECT_ID as string;

const { chains, publicClient } = configureChains(
  [Celo],
  [
    jsonRpcProvider({
      rpc: (chain) => ({
        http: `https://celo-mainnet.infura.io/v3/${process.env.NEXT_PUBLIC_INFURA_KEY}`,
      }),
    }),
    //publicProvider(),
  ]
);

const appInfo = {
  appName: "Lockie - Accesible savings and yield on Minipay",
};

const connectors = celoGroups({
  chains,
  projectId,
  appName: "Lockie - Accesible savings and yield on Minipay",
});

const wagmiConfig = createConfig({
  connectors,
  publicClient: publicClient,
  autoConnect: true,
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
