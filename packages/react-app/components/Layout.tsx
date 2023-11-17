import { FC, ReactNode, useEffect } from "react";
import Footer from "./Footer";
import Header from "./Header";
import { InjectedConnector } from "wagmi/connectors/injected";
import { useConnect } from "wagmi";
import toast, { Toaster } from "react-hot-toast";
interface Props {
  children: ReactNode;
}
const Layout: FC<Props> = ({ children }) => {
  const { connect } = useConnect({
    connector: new InjectedConnector(),
  });

  useEffect(() => {
    if (window.ethereum && window.ethereum.isMiniPay) {
      connect();
    }
  }, []);

  return (
    <>
      <Toaster />
      <div className=" flex flex-col min-h-screen">
        <Header />
        <div className="m">{children}</div>
        <Footer />
      </div>
    </>
  );
};

export default Layout;
