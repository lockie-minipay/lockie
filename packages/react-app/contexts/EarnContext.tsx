import { createContext, useState } from "react";

export const EarnContext = createContext(null);

const EarnContextProvider = ({ children }: { children: React.ReactNode }) => {
  const [isWithdraw, setIsWithdraw] = useState(false);

  return (
    //@ts-ignore
    <EarnContext.Provider value={{ isWithdraw, setIsWithdraw }}>
      {children}
    </EarnContext.Provider>
  );
};

export default EarnContextProvider;
