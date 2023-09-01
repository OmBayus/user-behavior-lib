import React, { useEffect, useState } from "react";
import CurrentField from "./class/CurrentField";
import Action from "./class/Action";
import Field from "./class/Field";
import ActionTypes from "./enums/action.types";

export const BehaviorContext = React.createContext();

export default function BehaviorContextProvider({ form, children }) {
  const [activeTime, setActiveTime] = useState(0);
  const [inactiveTime, setInactiveTime] = useState(0);
  const [startTime, setStartTime] = useState(Date.now());
  const [currentField, setCurrentField] = useState(
    new CurrentField(null, null, null)
  );
  const [actions, setActions] = useState([]);
  const [fields, setFields] = useState({});

  const focusField = (field) => {
    setCurrentField(prev=>{
      prev.init(field.id, field.name, Date.now());
      return prev;
    });
    setActions((prev) => [
      ...prev,
      new Action(field.id, field.name, ActionTypes.FOCUS_FIELD, Date.now()),
    ]);
  };

  const focusOutField = (field) => {
    const startTime = currentField.startTime;
    setFields((prev) => {
      prev[field.id].addTime((Date.now() - startTime));
      return prev;
    });
    setCurrentField((prev) => {
      prev.reset();
      return prev;
    });
    setActions((prev) => [
      ...prev,
      new Action(field.id, field.name, ActionTypes.FOCUS_OUT_FIELD, Date.now()),
    ]);
  };

  const execute = () => {
    const _activeTime = activeTime + Date.now() - startTime;
    const _startTime = Date.now();
    const _actions = [
      ...actions,
      new Action("", "", ActionTypes.EXECUTE, Date.now()),
    ];
    setActiveTime(_activeTime);
    setStartTime(_startTime);
    setActions(_actions);

    return {
      activeTime: _activeTime,
      inactiveTime,
      actions: _actions,
      fields: Object.values(fields),
    };
  };

  const windowFocus = () => {
    const _activeTime = activeTime + Date.now() - startTime;
    const _startTime = Date.now();
    const _actions = [
      ...actions,
      new Action("", "", ActionTypes.WINDOW_FOCUS, Date.now()),
    ];
    setActiveTime(_activeTime);
    setStartTime(_startTime);
    setActions(_actions);
  };

  const windowFocusOut = () => {
    const _inactiveTime = inactiveTime + Date.now() - startTime;
    const _startTime = Date.now();
    const _actions = [
      ...actions,
      new Action("", "", ActionTypes.WINDOW_FOCUS_OUT, Date.now()),
    ];
    setInactiveTime(_inactiveTime);
    setStartTime(_startTime);
    setActions(_actions);
  };

  useEffect(() => {
    if (form) {
      // eslint-disable-next-line react-hooks/exhaustive-deps
      let _fields = {};
      for (let field of form.fields) {
        _fields[field.id] = new Field(field.id, field.name, field.type);
      }
      setFields(_fields);
      setActions([])
      setCurrentField(new CurrentField(null, null, null));
      setStartTime(Date.now());
      setActiveTime(0);
      setInactiveTime(0);
      

      const handleVisibilityChange = () => {
        if (!document.hidden) {
          // active
          windowFocus();
        } else {
          // passive
          windowFocusOut();
        }
      };

      document.addEventListener("visibilitychange", handleVisibilityChange);

      return () => {
        document.removeEventListener(
          "visibilitychange",
          handleVisibilityChange
        );
      };
    }
  }, [form]);

  return (
    <BehaviorContext.Provider value={{ focusField, focusOutField, execute }}>
      {children}
    </BehaviorContext.Provider>
  );
}
