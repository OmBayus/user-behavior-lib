export const behaviorActionsEnum = {
  focusField: "focusField",
  focusOutField: "focusOutField",
  execute: "execute",
  windowFocus: "windowFocus",
  windowFocusOut: "windowFocusOut",
  reset: "reset",
};

export const behaviorActions = {
  focusField: (field) => {
    return {
      type: behaviorActionsEnum.focusField,
      payload: field,
    };
  },
  focusOutField: (field) => {
    return {
      type: behaviorActionsEnum.focusOutField,
      payload: field,
    };
  },
  execute: () => {
    return {
      type: behaviorActionsEnum.execute,
    };
  },
  windowFocus: () => {
    return {
      type: behaviorActionsEnum.windowFocus,
    };
  },
  windowFocusOut: () => {
    return {
      type: behaviorActionsEnum.windowFocusOut,
    };
  },
  reset: (fields) => {
    return {
      type: behaviorActionsEnum.reset,
      payload: fields,
    };
  },
};
