import { createContext, useState } from "react";

export const EarnContext = createContext(null);

const EarnContextProvider = ({ children }) => {
  const [isWithdraw, setIsWithdraw] = useState(false);

  return (
    <EarnContext.Provider value={{ isWithdraw, setIsWithdraw }}>
      {children}
    </EarnContext.Provider>
  );
};

export default EarnContextProvider;
