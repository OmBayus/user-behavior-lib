import React, { useEffect, useState } from "react";

export const BehaviorContext = React.createContext();

export default function BehaviorContextProvider({ children }) {
  const [behavior, setBehavior] = useState(10);
  return (
    <BehaviorContext.Provider value={{ behavior, setBehavior }}>
      {children}
    </BehaviorContext.Provider>
  );
}
