import React, { useEffect, useState } from "react";

export const BehaviorContext = React.createContext();

export default function BehaviorContextProvider({ form, children }) {
  const [activeTime, setActiveTime] = useState(0);
  const [inactiveTime, setInactiveTime] = useState(0);
  const [startTime, setStartTime] = useState(Date.now());
  const [currentField, setCurrentField] = useState(
    { id: null, name: null, startTime: null}
  );
  const [fields, setFields] = useState({});

  const focusField = (field) => {
    setCurrentField({ id: field.id, name: field.name, startTime: Date.now() })
  };

  const focusOutField = (field) => {
    const startTime = currentField.startTime;
    const {id:fieldId} = field;
    const _field = fields[fieldId];
    if(_field){
      const usedTime = (Date.now() - startTime);
      _field.totalTime += usedTime;
      setFields((prev) => {
        prev[fieldId] = _field;
        return prev;
      });
    }
    setCurrentField({ id: null, name: null, startTime: null })
  };

  const execute = () => {
    const _activeTime = activeTime + Date.now() - startTime;
    const _startTime = Date.now();
    setActiveTime(_activeTime);
    setStartTime(_startTime);

    return {
      activeTime: _activeTime,
      inactiveTime,
      fields: Object.values(fields),
    };
  };

  const windowFocus = () => {
    const _activeTime = activeTime + Date.now() - startTime;
    const _startTime = Date.now();
    setActiveTime(_activeTime);
    setStartTime(_startTime);
  };

  const windowFocusOut = () => {
    const _inactiveTime = inactiveTime + Date.now() - startTime;
    const _startTime = Date.now();
    setInactiveTime(_inactiveTime);
    setStartTime(_startTime);
  };

  useEffect(() => {
    if (form) {
      // eslint-disable-next-line react-hooks/exhaustive-deps
      let _fields = {};
      for (let field of form.fields) {
        _fields[field.id] = {id: field.id, name: field.name, type: field.type, totalTime: 0};
      }
      setFields(_fields);
      setCurrentField({ id: null, name: null, startTime: null });
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
