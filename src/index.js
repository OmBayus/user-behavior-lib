import React, { useEffect, useReducer } from "react";
import { behaviorReducer, behaviorActions } from "./reducers/behavior";

export const BehaviorContext = React.createContext();

export default function BehaviorContextProvider({ form, children }) {
  const [state, dispatch] = useReducer(behaviorReducer, {
    activeTime: 0,
    inactiveTime: 0,
    startTime: Date.now(),
    currentField: { id: null, name: null, startTime: null },
    fields: {},
  });

  useEffect(() => {
    if (form) {
      const fields = form.fields.reduce((acc, field) => {
        acc[field.id] = {id: field.id, name: field.name, type: field.type, totalTime: 0};
        return acc;
      }, {});
      dispatch(behaviorActions.reset(fields))

      const handleVisibilityChange = () => {
        if (!document.hidden) {
          // active
          dispatch(behaviorActions.windowFocus())
        } else {
          // passive
          dispatch(behaviorActions.windowFocusOut())
        }
      };

      document.addEventListener("visibilitychange", handleVisibilityChange);

      return () => {
        document.removeEventListener("visibilitychange", handleVisibilityChange);
      };
    }
  }, [form]);

  const focusField = (field) => {
    dispatch(behaviorActions.focusField(field));
  };

  const focusOutField = (field) => {
    dispatch(behaviorActions.focusOutField(field));
  };

  const execute = () => {
    dispatch(behaviorActions.execute());

    return {
      activeTime: state.activeTime,
      inactiveTime: state.inactiveTime,
      fields: Object.values(state.fields),
    };
  };

  return (
    <BehaviorContext.Provider value={{ focusField, focusOutField, execute }}>
      {children}
    </BehaviorContext.Provider>
  );
}
