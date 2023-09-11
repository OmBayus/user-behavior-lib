import React, { useEffect, useReducer } from "react";
import { trackElementUsage as trackElementUsageAction, stopTrackingElementUsage as stopTrackingElementUsageAction, windowFocus,windowFocusOut,  } from "./reducers/behavior/behavior.action";
import { behaviorReducer } from "./reducers/behavior/behavior.reducer";

const BehaviorContext = React.createContext();

export const useBehavior = () => React.useContext(BehaviorContext);

export default function BehaviorProvider({ children }) {
  const [state, dispatch] = useReducer(behaviorReducer, {
    activeTime: 0,
    inactiveTime: 0,
    startTime: Date.now(),
    fields: {},
  });

  useEffect(() => {
    const onVisibilityChange = () => {
      if (!document.hidden) {
        // active
        dispatch(windowFocus());
      } else {
        // passive
        dispatch(windowFocusOut());
      }
    };

    document.addEventListener("visibilitychange", onVisibilityChange);

    return () => {
      document.removeEventListener("visibilitychange", onVisibilityChange);
    };
  }, []);

  const trackElementUsage = ({ id, ...rest }) => {
    dispatch(trackElementUsageAction({ id, rest }));
  };

  const stopTrackingElementUsage = ({ id, ...rest }) => {
    // const stopTrackingElementUsage = ({ id, ...rest }) => {
    dispatch(stopTrackingElementUsageAction({ id, rest }));
  };

  const execute = () => {
    const activeTime = state.activeTime + (Date.now() - state.startTime);

    const fields = Object.values(state.fields).map(({id,rest,totalTime}) => ({
      ...rest,
      id,
      totalTime
    }));
    const inactiveTime = state.inactiveTime

    return {
      activeTime,
      inactiveTime,
      fields
    };
  };

  return (
    <BehaviorContext.Provider value={{ trackElementUsage, stopTrackingElementUsage, execute }}>
      {children}
    </BehaviorContext.Provider>
  );
}
